// app/page.tsx
"use client"

import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/mail")
    }
  }, [session])

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Zaloguj się za pomocą Google
      </button>
    </div>
  )
}
