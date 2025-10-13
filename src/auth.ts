import NextAuth from "next-auth";
import { prisma } from "./lib";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { User } from "next-auth";

export const {
  handlers: { GET, POST },
  auth, signIn, signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );
        if (!isValid) return null;

        return { id: user.id, email: user.email, role: user.role } as User;
      },
    }),
  ], 
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.sub = user.id;
            }
            return token;
    },
    async session({ session, token }) {
        if (session?.user && token) {
            session.user.id = token.sub as string;
            session.user.role = token.role;
        }
        return session;
    }
}
})