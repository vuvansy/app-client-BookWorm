import ForgotPasswordForm from "./form-forgot-password";


const ForgotPasswordPage = () => {
    return (
        <div className="bg-bg-main">
            <div className="container bg-white rounded-lg my-5 ">
                <div className="w-[600px] mx-auto py-7">
                    <div className="text-heading3  mb-[10px] flex items-center justify-center">Quên Mật Khẩu</div>
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;
