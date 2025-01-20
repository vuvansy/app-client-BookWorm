'use client'
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Image, Select } from 'antd';

// const onFinish = (values: any) => {
//     console.log('Success:', values);
//     // console.log('Image:', imageUrl);

// };

// const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
// };


type FieldType = {
    fullname?: string;
    email?: string;
    phone?: number
    city?: string;
    district?: string;
    ward?: string;
    imageUrl?: string;
    remember?: string;
};

const EditProfileForm = () => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const defaultAvatarUrl = 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'; // URL của ảnh avatar mặc định

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

    };

    const onFinish = (values: any) => {
        values.imageUrl = imageUrl; // Thêm imageUrl vào values
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600, marginTop: "50px" }}
            className='max-w-[1190px]'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size='large'
        >

            <div className='flex justify-between'>
                <div className='w-[190px] h-[230px] rounded-[10px] shadow-2xl drop-shadow-2xl flex align-center justify-center'>
                    <Form.Item>
                        <Image src={imageUrl || defaultAvatarUrl} alt="avatar" width={130} height={130} className='mt-[10px] rounded-full' />
                        <div className='flex justify-center mt-[45px] '>
                            <input type="file" onChange={handleFileChange} id="file-upload" accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload" className=" w-[96px] h-[35px] cursor-pointer bg-white text-black border border-black/100  rounded-[5px] flex items-center justify-center">
                                Chọn Ảnh
                            </label>
                        </div>
                    </Form.Item>
                </div>

                <div className='w-[970px] flex flex-wrap justify-between'>
                    <div className='mb-[10px]'>
                        <div className='h-[30px] text-body1'>Họ Và Tên</div>
                        <Form.Item<FieldType>
                            name="fullname"
                            rules={[{ required: true, message: 'Please input your fullname!' }]}
                            className='w-[480px] h-[30px]'
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className='mb-[10px]'>
                        <div className='h-[30px] text-body1'>Email</div>
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                            className='w-[480px] h-[30px]'
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className='mb-[10px]'>
                        <div className='h-[30px] text-body1'>Số Điện Thoại</div>
                        <Form.Item<FieldType>
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                            className='w-[480px] h-[30px]'
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className=' w-[970px] flex  justify-between'>
                        <div className='w-[310px]'>
                            <div className='h-[30px] text-body1'>Chọn tỉnh / thành phố</div>
                            <Form.Item<FieldType>
                                name="city"
                                rules={[{ required: true, message: 'Please choose your city!' }]}
                            >
                                <Select placeholder="Chọn một tỉnh / thành phố" allowClear >
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='w-[310px]'>
                            <div className='h-[30px] text-body1'>Chọn quận / huyện</div>
                            <Form.Item<FieldType>
                                name="district"
                                rules={[{ required: true, message: 'Please choose your district!' }]}
                            >
                                <Select placeholder="Chọn một quận / huyện" allowClear>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='w-[310px]'>
                            <div className='h-[30px] text-body1'>Chọn phường / xã</div>
                            <Form.Item<FieldType>
                                name="ward"
                                rules={[{ required: true, message: 'Please choose your ward!' }]}
                            >
                                <Select placeholder="Chọn một phường / xã" allowClear>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <button type='submit' className='w-[200px] h-10 rounded-lg bg-red1 text-white text-body-bold mx-auto'>Lưu Thay Đổi</button>
                </div>
            </div>


        </Form>
    );
};

export default EditProfileForm;


