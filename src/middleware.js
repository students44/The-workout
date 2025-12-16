import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Protect Admin Routes: If not admin, redirect to login (or could be 403)
        if (
            req.nextUrl.pathname.startsWith("/admin") &&
            req.nextauth.token?.role !== "admin"
        ) {
            return NextResponse.rewrite(new URL("/login", req.url));
        }

        // Protect User Dashboard Routes: If is admin, redirect to Admin Dashboard
        // This ensures Admins see ONLY the Admin Dashboard
        if (
            req.nextUrl.pathname.startsWith("/dashboard") &&
            req.nextauth.token?.role === "admin"
        ) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
