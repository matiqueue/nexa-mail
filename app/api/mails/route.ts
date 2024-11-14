// app/api/mails/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { google } from "googleapis"

export async function GET(req: NextRequest) {
  const token = await getToken({ req })

  if (!token || !token.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: token.accessToken as string })
  const gmail = google.gmail({ version: "v1", auth })

  try {
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    })
    const messages = res.data.messages || []

    const mails = await Promise.all(
      messages.map(async (message) => {
        const msg = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
          format: "full",
        })

        const headers = msg.data.payload?.headers || []
        const getHeader = (name: string) =>
          headers.find((header) => header.name === name)?.value || ""

        return {
          id: msg.data.id!,
          name: getHeader("From"),
          email: getHeader("From"),
          subject: getHeader("Subject"),
          text: msg.data.snippet || "",
          date: new Date(parseInt(msg.data.internalDate || "0")),
          read: !msg.data.labelIds?.includes("UNREAD"),
          labels: msg.data.labelIds || [],
        }
      })
    )

    return NextResponse.json(mails)
  } catch (error) {
    console.error("Error fetching mails:", error)
    return NextResponse.json({ error: "Error fetching mails" }, { status: 500 })
  }
}
