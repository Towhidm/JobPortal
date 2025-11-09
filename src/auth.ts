import NextAuth from "next-auth";
import { prisma } from "./lib";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { User } from "next-auth";
export const {
  handlers, 
  auth,
  signIn,
  signOut,
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
          where: { email: credentials.email as string,verified: true },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );
        if (!isValid) return null;

        return { id: user.id, email: user.email, role: user.role,name: user.name } as User;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role 
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});


