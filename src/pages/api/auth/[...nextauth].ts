import NextAuth from 'next-auth';
import { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../utils/db';
import User from '../../../models/User'; // Assuming you have a User model defined

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ✅ Ensure credentials exist
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }
        const { email, password } = credentials;

        await connectToDatabase();

        // ✅ Fetch user from database
        const user = await User.findOne({ email }).select('+password'); // Ensure password is selected
        if (!user) {
          throw new Error('No user found with the email');
        }

        // ✅ Compare password using bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // ✅ Return user object
        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: undefined // Will disable the new account creation screen
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
