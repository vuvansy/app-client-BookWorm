import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from 'next-auth';
import { sendRequest } from "@/utils/api";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    //Khai báo nhà cung cấp dịch vụ login: github, fb, gg...
    providers: [

        //Login bằng tài khoản đăng nhập bằng tài khoản truyền thống (username, password).
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "BookWorm",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                //Xử lý logic login
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/login`,
                    method: "POST",
                    body: {
                        email: credentials?.email,
                        password: credentials?.password
                    },
                })

                if (res && res.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    console.log(res.data);
                    return res.data as any;
                } else {
                    // return null
                    throw new Error(res?.message as string)
                }
            }
        }),

        //Hỗ trợ đăng nhập bằng Provider. 
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        //Mỗi 1 lần F5 lại trang, server giải mã token nạp ngược lại session
        //JWT: Định dạng token được sử dụng để lưu trạng thái đăng nhập.
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider !== "credentials") {

                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/social-media`,
                    method: "POST",
                    body: {
                        type: account?.provider?.toLocaleUpperCase(),
                        email: user.email,
                        fullName: user.name
                    },
                })

                // if (res.data) {
                //     token.access_token = res.data?.access_token;
                //     token.refresh_token = res.data.refresh_token;
                //     token.user = res.data.user;
                // }
                if (res?.data) {
                    token.access_token = res.data?.access_token;
                    token.refresh_token = res.data.refresh_token;
                    token.user = res.data.user;
                } else {
                    // Gán lỗi vào token để truyền sang session
                    token.error = res?.message || "Tài khoản của bạn đã bị khóa.";
                }

            }

            //Login bằng tài khoản 
            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token;
                //@ts-ignore
                token.refresh_token = user.refresh_token;
                //@ts-ignore
                token.user = user.user;
            }

            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.user = token.user;
                session.error = token.error;
            }
            return session;
        }
    },

    // pages: {
    //     signIn: "auth/signin"
    // }
}
