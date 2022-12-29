import NextAuth, { NextAuthOptions, Account, User } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ObjectId } from "mongodb";
import env from "@/lib/env";
import { hashPassword, verifyPassword } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { createUser, getUser } from "@/models/user";
import { getAccount } from "@/models/account";

const adapter = MongoDBAdapter(clientPromise);

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials found.");
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getUser({ email });
        if (!user) {
          throw new Error("User with given credential does not exist!");
        }
        if (!user.password) {
          const userAccount = await getAccount({
            userId: new ObjectId(user._id),
          });
          if (!userAccount) return null;
          throw new Error(
            userAccount.provider + " account exists, use that to login"
          );
        }

        const hasValidPassword = await verifyPassword(password, user.password);

        if (!hasValidPassword) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: env.google.clientId,
      clientSecret: env.google.clientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  secret: env.nextAuth.secret,
  callbacks: {
    async session({ session, token }) {
      if (token && session) {
        session.user.id = token.sub as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);

const linkAccount = async (user: User, account: Account) => {
  return await adapter.linkAccount({
    providerAccountId: account.providerAccountId,
    userId: user?.id,
    provider: account.provider,
    type: "oauth",
    scope: account.scope,
    token_type: account.token_type,
    access_token: account.access_token,
  });
};
