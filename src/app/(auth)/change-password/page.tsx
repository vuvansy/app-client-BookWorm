import ChangePasswordForm from "./form-change-password";



const UpdatePasswordPage = () => {
    return (
        <div className="bg-bg-main">
            <div className="container bg-white rounded-lg my-5">
                <div className="w-[600px] mx-auto py-7">
                    <div className="text-heading3  mb-[10px] flex items-center justify-center">Đổi Mật Khẩu</div>
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    )
}

export default UpdatePasswordPage;