import LoginForm from "./form-login";


const LoginPage = () => {
    return (
        <div className="bg-bg-main pt-5">
            <div className="container bg-white rounded-lg ">
                <div className="w-[600px] mx-auto py-7">
                    <div className=" text-heading3  mb-[10px] flex items-center justify-center">Đăng Nhập</div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
