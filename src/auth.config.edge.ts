import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

// Edge-safe auth config without Prisma imports
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            allowDangerousEmailAccountLinking: true
        }),
        Github({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            allowDangerousEmailAccountLinking: true
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            authorize: async (credentials) => {
                // For edge runtime, we'll handle credentials in the main auth config
                // This is just a placeholder to avoid Prisma import
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id
                token.isApproved = user.isApproved
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string
                session.user.isApproved = token.isApproved as boolean
            }
            return session
        },
    },
} satisfies NextAuthConfig
