import {NextRequest, NextResponse} from "next/server";
import {getSessionCookie} from "better-auth/cookies"

export async function proxy(request: NextRequest) {
    const sessionCookies = getSessionCookie(request);
    console.log("Log from middleware",sessionCookies);

    const pathname = request.nextUrl.pathname;
    const isAuthenticated = !!sessionCookies

    if (isAuthenticated && pathname.startsWith("/signin")) return  NextResponse.redirect(new  URL('/', request.nextUrl))

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};