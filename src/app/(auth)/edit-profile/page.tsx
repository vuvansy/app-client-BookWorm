import EditProfileForm from './form-edit-profile';



const EditProfilePage = () => {
    return (
        <div className="bg-bg-main">
            <div className="container bg-white rounded-lg my-5">
                <div className=" mx-auto py-7">
                    <div className="text-heading4-bold mb-[10px] flex items-center ">Thông tin cá nhân</div>
                    <div className=' mx-[5px]'>
                        <EditProfileForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage;