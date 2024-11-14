// app/mail/page.tsx
"use client"

import { Mail } from "@/app/mail/components/mail"
import { accounts } from "@/app/mail/data"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function MailPage() {
  const { status } = useSession()
  const [mails, setMails] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }

    const fetchMails = async () => {
      try {
        const res = await fetch("/api/mails", {
          cache: "no-store",
        })

        if (!res.ok) {
          console.error("Error fetching mails:", res.status, res.statusText)
          return
        }

        const data = await res.json()
        setMails(data)
      } catch (error) {
        console.error("Error fetching mails:", error)
      }
    }

    if (status === "authenticated") {
      fetchMails()
    }
  }, [status])

  if (status === "loading") {
    return <div>Ładowanie..</div>
  }

  return (
    <div className="p-3 hidden flex-col md:flex">
      <Mail accounts={accounts} mails={mails} navCollapsedSize={4} />
    </div>
  )
}
