import EditProfileForm from './form-edit-profile';

const EditProfilePage = () => {
    return (
        <div className="bg-bg-main pt-[30px] px-5 md:px-2 lg:px-0">
            <div className="container bg-white rounded-lg mx-auto max-w-full md:max-w-3xl lg:max-w-[1230px]">
                <div className="py-7 px-4 md:px-8 lg:px-12">
                    <div className="text-heading4-bold mb-4 flex items-center">Thông tin cá nhân</div>
                    <div className='mx-2'>
                        <EditProfileForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage;