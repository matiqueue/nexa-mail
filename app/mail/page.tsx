import { Mail } from "@/app/mail/components/mail"
import { accounts, mails } from "@/app/mail/data"

export default function MailPage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <Mail accounts={accounts} mails={mails} navCollapsedSize={4} />
      </div>
    </>
  )
}