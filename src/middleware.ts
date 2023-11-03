import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    // Only "getToken" worked !
    const session = await getToken({ req });

    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/admin/auth/login", req.url));
    }

    const urlStartsWithAuthLogin =
      req.nextUrl.pathname.startsWith("/admin/auth/login");

    const urlStartsWithAuthSignUp =
      req.nextUrl.pathname.startsWith("/admin/auth/signup");

    if ((urlStartsWithAuthLogin || urlStartsWithAuthSignUp) && session) {
      return NextResponse.redirect(new URL("/admin/users", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token: session }) => {
        const urlStartsWithAdminUsers =
          req.nextUrl.pathname.startsWith("/admin/users");

        if (urlStartsWithAdminUsers && !session) {
          return false;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/", "/admin/auth/login", "/admin/auth/signup", "/admin/users"],
};
