import { loginUserService } from "@/app/(routes)/admin/auth/login/services/loginUserService";
import { ISessionUserJWT } from "@/app/(routes)/admin/auth/types/ISessionUserJWT";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { TOO_MANY_REQUEST_ERROR_MESSAGE } from "@/shared/constants/tooManyRequestsErrorMessage";
import { ILoginRequestBody } from "@/app/(routes)/admin/auth/login/types/ILoginRequestBody";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        remember: { label: "Remember me", type: "checkbox" },
      },

      async authorize(credentials): Promise<any> {
        const response = await loginUserService(<ILoginRequestBody>{
          email: credentials?.email,
          password: credentials?.password,
          remember: credentials?.remember === "true", // Next Auth forces this to be string, but it must be boolean !
        });

        if (response.statusCode === 429) {
          throw new Error(TOO_MANY_REQUEST_ERROR_MESSAGE);
        }

        if (response.email) {
          return response;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as ISessionUserJWT;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
