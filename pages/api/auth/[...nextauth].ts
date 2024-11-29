import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../services/prisma/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      // Custom logic for the session callback
      session.user = { ...session.user, ...user }; // Extend session user properties if needed
      return session; // Return the modified session
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET!,
  pages: {
    signIn: '/auth/signin',
  },
};
