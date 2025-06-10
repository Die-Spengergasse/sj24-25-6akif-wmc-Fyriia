// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";


export const authOptions: NextAuthOptions = {
    // @ts-expect-error trustHost isn't typed in v4, but it's valid
    trustHost: true,
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_CLIENT_ID!,
            clientSecret: process.env.AZURE_CLIENT_SECRET!,
            tenantId: process.env.AZURE_TENANT_ID!,
            authorization: {
                params: {
                    scope: [
                        "openid",
                        "profile",
                        "email",            // ← add this back
                        "offline_access",
                        `api://${process.env.AZURE_API_CLIENT_ID}/access_as_user`
                    ].join(" "),
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) token.access_token = account.access_token;
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.access_token as string | undefined;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
