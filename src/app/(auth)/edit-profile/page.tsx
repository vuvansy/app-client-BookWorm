import EditProfileForm from './form-edit-profile';



const EditProfilePage = () => {
    return (
        <div className="bg-bg-main pt-5">
            <div className="container bg-white rounded-lg ">
                <div className=" mx-auto py-7 px-[15px]">
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