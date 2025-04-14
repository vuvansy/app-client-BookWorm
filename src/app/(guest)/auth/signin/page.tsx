import { authOptions } from "@/app/api/auth/auth.options";
import LoginForm from "./form-login";
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'


const LoginPage = async() => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        // redirect to homepage
        redirect("/")
    }
    return (
        <div className="bg-bg-main pt-[30px] px-5 md:px-2 lg:px-0">
            <div className="container bg-white rounded-lg flex items-center justify-center py-7 px-5 mx-auto max-w-2xl md:max-w-3xl lg:max-w-[1230px]">
                <div className="w-full md:w-3/4 lg:w-1/2">
                    <div className="text-heading3 mb-4 flex items-center justify-center">Đăng Nhập</div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
