
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth
        // console.log(token);

        // Nếu chưa đăng nhập, để next-auth tự xử lý (redirect đến signIn)
        if (!token) return NextResponse.next()

        // Kiểm tra nếu user không có type là SYSTEM
        const isRestricted = ["/edit-profile", "/change-password"].some((path) =>
            req.nextUrl.pathname.startsWith(path)
        )

        if (isRestricted && token?.user.type !== "SYSTEM") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        return NextResponse.next()
    },
    {
        pages: {
            signIn: "/auth/signin",
            error: "/auth/signin",
        },
    }
)

export const config = {
    matcher: ["/profile/:path*", "/edit-profile", "/change-password"],
}
