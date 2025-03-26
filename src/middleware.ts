import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = ["/login", "/register"];
const protectedPaths = ["/profile/order", "/profile/wishlist", "/edit-profile", "/change-password"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const refresh_token = request.cookies.get("refresh_token")?.value;
    console.log(refresh_token);
    if (!refresh_token) {
        if (protectedPaths.some((path) => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/account`, {
            method: "GET",
            headers: { Authorization: `Bearer ${refresh_token}` },
        });

        if (res.ok) {
            if (authPaths.some((path) => pathname.startsWith(path))) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }
    } catch (error) {
        console.error("Lỗi kiểm tra token:", error);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/profile/order", "/profile/wishlist", "/edit-profile", "/change-password"],
};
