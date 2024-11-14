// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id?: string
    } & DefaultSession["user"]
  }

  interface JWT {
    accessToken?: string
    user?: {
      id?: string
    } & DefaultUser
  }
}
