import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/db";
import User from "./models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub,
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: {
        code: { label: "Guest Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.code) return null;
        await dbConnect();
        const user = await User.findOne({ guestToken: credentials.code });
        if (!user) return null;
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          isGuest: user.isGuest,
          guestToken: user.guestToken,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "guest") return true;
      try {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image || "",
          });
        } else {
          console.log(`User already exist`);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.isGuest = user.isGuest;
        token.guestToken = user.guestToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isGuest = token.isGuest;
        session.user.guestToken = token.guestToken;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
