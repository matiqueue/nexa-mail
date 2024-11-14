// app/mail/use-mail.ts
import { atom, useAtom } from "jotai"

const configAtom = atom({
  selected: null as string | null,
})
export function useMail() {
  return useAtom(configAtom)
}
