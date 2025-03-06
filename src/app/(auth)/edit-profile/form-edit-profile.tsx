'use client'

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Image, Upload, FormProps } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

type FieldType = {
    fullName: string;
    email: string;
    phone: string;
    city?: string;
    district?: string;
    ward?: string;
    specific_address?: string;
    image: string;
};

const EditProfileForm = () => {
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
    const [file, setFile] = useState(null);
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [form] = Form.useForm();
    const defaultAvatarUrl = 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'; // URL của ảnh avatar mặc định

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error("Lỗi khi fetch dữ liệu:", error));
    }, []);

    const handleCityChange = (cityId: string) => {
        const selectedCity = cities.find(city => city.Id === cityId);
        setDistricts(selectedCity ? selectedCity.Districts : []);
        setWards([]);

        form.setFieldsValue({
            district: undefined,
            ward: undefined
        });
    };

    const handleDistrictChange = (districtId: string) => {
        const selectedDistrict = districts.find(district => district.Id === districtId);
        setWards(selectedDistrict ? selectedDistrict.Wards : []);
        form.setFieldsValue({ ward: undefined });
    };

    const handleUpload = (info: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        setFile(info.file);
        reader.readAsDataURL(info.file);
    };

    // const handleRemove = () => {
    //     setImageUrl(defaultAvatarUrl);
    //     setFile(null);
    // };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const selectedCity = cities.find(city => city.Id === values.city);
        const selectedDistrict = districts.find(district => district.Id === values.district);
        const selectedWard = wards.find(ward => ward.Id === values.ward);
        const formattedData = {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            address: {
                city: selectedCity ? { key: selectedCity.Id, name: selectedCity.Name } : null,
                district: selectedDistrict ? { key: selectedDistrict.Id, name: selectedDistrict.Name } : null,
                ward: selectedWard ? { key: selectedWard.Id, name: selectedWard.Name } : null,
                specific_address: values.specific_address,
            },
            image: file,
        };

        console.log("Formatted Data:", formattedData);
    };

    return (
        <Form
            name="basic"
            className='max-w-[1190px] !pt-5 mx-auto'
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
        >
            <div className='flex flex-col md:flex-row gap-x-5'>
                <div className='basis-full md:basis-1/6 h-60 ml-5 rounded-[10px] border-2 flex align-center justify-center relative group mb-5 md:mb-0'>
                    <Form.Item
                        name="image"
                    >
                        <div>
                            <Image src={typeof imageUrl === 'string' ? imageUrl : defaultAvatarUrl} alt="Uploaded" width={130} height={130} className=" mt-4 rounded-full "

                                preview={{
                                    maskClassName: "rounded-full w-[100%] h-[100%] mt-4 ",
                                    // mask: (
                                    //     <div className="flex justify-center items-center gap-x-10">
                                    //         <EyeOutlined />
                                    //         {imageUrl && imageUrl !== defaultAvatarUrl && <DeleteOutlined onClick={handleRemove} />}
                                    //     </div>
                                    // ),
                                }}
                            />

                            <div className='flex justify-center mt-[45px] '>
                                <Upload beforeUpload={() => false} showUploadList={false} onChange={handleUpload}>
                                    <Button>Chọn Ảnh</Button>
                                </Upload>
                            </div>
                        </div>
                    </Form.Item>
                </div>

                <div className='basis-full md:basis-4/5'>
                    <div className='flex flex-col md:flex-row justify-between gap-x-5'>
                        <Form.Item<FieldType>
                            name="fullName"
                            label="Tên Hiển Thị"
                            rules={[{ required: true, message: 'Hãy nhập tên hiển thị!' }]}
                            className='basis-full md:basis-1/2'
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="email"
                            label="Email"
                            className='basis-full md:basis-1/2'
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    {/* <div className='flex flex-col md:flex-row'> */}
                    <Form.Item<FieldType>
                        name="phone"
                        label="Số Điện Thoại"
                        rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
                        className='basis-full md:w-[49%]'
                    >
                        <Input />
                    </Form.Item>
                    {/* </div> */}

                    <div className='flex flex-col md:flex-row justify-between gap-x-5'>
                        <Form.Item<FieldType>
                            name='city'
                            label="Chọn Tỉnh / Thành Phố"
                            className='basis-full md:flex-1'
                        >
                            <Select
                                showSearch
                                allowClear
                                placeholder="Chọn Tỉnh/Thành Phố"
                                options={cities.map(city => ({ value: city.Id, label: city.Name }))}
                                onChange={handleCityChange}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name='district'
                            label="Chọn Quận / Huyện"
                            className='basis-full md:flex-1'
                        >
                            <Select
                                showSearch
                                allowClear
                                placeholder="Chọn Quận/Huyện"
                                options={districts.map(district => ({ value: district.Id, label: district.Name }))}
                                onChange={handleDistrictChange}
                                disabled={!districts.length} // Vô hiệu hóa nếu chưa chọn tỉnh/thành phố
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name='ward'
                            label="Chọn Phường / Xã"
                            className='basis-full md:flex-1'
                        >
                            <Select
                                placeholder="Chọn Phường/Xã"
                                showSearch
                                allowClear
                                options={wards.map(ward => ({ value: ward.Id, label: ward.Name }))}
                                disabled={!wards.length} // Vô hiệu hóa nếu chưa chọn quận/huyện
                            />
                        </Form.Item>
                    </div>

                    <Form.Item<FieldType>
                        name='specific_address'
                        label="Nhập Địa Chỉ Cụ Thể"
                    >
                        <Input />
                    </Form.Item>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <Button type="primary" htmlType="submit" className='w-full md:w-[20%] !bg-red1 !text-body-bold'>Lưu Thay Đổi</Button>
            </div>
        </Form>
    );
};

export default EditProfileForm;





