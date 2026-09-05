import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    isGuest?: boolean;
    guestToken?: string;
  }
  interface Session {
    user: {
      isGuest?: boolean;
      guestToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isGuest?: boolean;
    guestToken?: string;
  }
}
