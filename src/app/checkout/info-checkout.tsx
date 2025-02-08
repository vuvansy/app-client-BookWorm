"use client"

import { Select } from "antd";
import { MdOutlinePayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
const { TextArea } = Input;

type FieldType = {
    fullName?: string;
    email?: string;
    phone?: string;
    city?: string;
    district?: string;
    ward?: string;
    address?: string;
    note?: string;
};

const InfoCheckout = () => {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="basic"
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className="flex justify-between pb-[20px]"
        >
            <div className="basis-8/12 ">
                <div className="bg-white rounded-lg px-[16px] py-[8px]">
                    <div className="uppercase py-[8px] text-body-bold">Địa chỉ giao hàng</div>
                    <div>
                        <div className="flex justify-between items-center gap-x-4">
                            <Form.Item<FieldType>
                                label="Họ Và Tên"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập họ và tên'
                                    }
                                ]}
                                className="basis-6/12 !mb-3"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Email'
                                    }, { type: "email", message: 'Email không đúng định dạng' },
                                ]}
                                className="basis-6/12 !mb-3"
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            label="Số Điện Thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!'
                                }
                            ]}
                            className="!mb-3"
                        >
                            <Input />
                        </Form.Item>
                        <div className="flex justify-between items-center gap-x-4">
                            <Form.Item<FieldType>
                                label="Chọn Tỉnh/Thành Phố"
                                name="city"
                                rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố' }]}
                                className="basis-4/12 !mb-3"
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Chọn Tỉnh/Thành Phố"
                                    options={[
                                        { value: "Arts", label: "Arts" },
                                        { value: "Business", label: "Business" },
                                        { value: "Comics", label: "Comics" },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Chọn Quận/Huyện"
                                name="district"
                                rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện' }]}
                                className="basis-4/12 !mb-3"
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Chọn Quận/Huyện"
                                    options={[
                                        { value: "Arts", label: "Arts" },
                                        { value: "Business", label: "Business" },
                                        { value: "Comics", label: "Comics" },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Chọn Phường/Xã"
                                name="ward"
                                rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã' }]}
                                className="basis-4/12 !mb-3"
                            >
                                <Select
                                    placeholder="Chọn Phường/Xã"
                                    showSearch
                                    allowClear
                                    options={[
                                        { value: "Arts", label: "Arts" },
                                        { value: "Business", label: "Business" },
                                        { value: "Comics", label: "Comics" },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            label="Nhập địa chỉ cụ thể"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ cụ thể!'
                                }
                            ]}
                            className="!mb-3"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Ghi Chú Đơn Hàng"
                            name="note"
                            className="!mb-3"

                        >
                            <TextArea rows={2} />
                        </Form.Item>
                        <div className="flex justify-between items-center gap-x-4">
                            <Form.Item<FieldType>
                                name="city"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức Vận chuyển!' }]}
                                className="basis-6/12"
                            >
                                <div>
                                    <div className="mb-2 font-medium flex items-center gap-x-1">
                                        <MdOutlinePayment className="text-[18px]" />
                                        <span>Phương thức Vận chuyển</span>
                                    </div>
                                    <Select
                                        showSearch
                                        allowClear
                                        placeholder="Chọn phương thức vận chuyển"
                                        options={[
                                            { value: "Arts", label: "Arts" },
                                            { value: "Business", label: "Business" },
                                            { value: "Comics", label: "Comics" },
                                        ]}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="city"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                                className="basis-6/12"
                            >
                                <div>
                                    <div className="mb-2 font-medium flex items-center gap-x-1">
                                        <TbTruckDelivery className="text-[18px]" />
                                        <span>Phương thức thanh toán</span>
                                    </div>
                                    <Select
                                        placeholder="Chọn phương thức thanh toán"
                                        showSearch
                                        allowClear
                                        options={[
                                            { value: "Arts", label: "Arts" },
                                            { value: "Business", label: "Business" },
                                            { value: "Comics", label: "Comics" },
                                        ]}
                                    />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-4/12 pl-[15px]">
                <div className="bg-white rounded-lg px-[16px] py-[8px]">
                    <h2 className="text-body-bold">ĐƠN HÀNG</h2>
                    <div className="flex justify-between items-center my-[8px] text-caption font-semibold">
                        <p>Tạm tính</p>
                        <span>1,792,000 đ</span>
                    </div>
                    <div className="flex justify-between items-center my-[8px] text-caption font-semibold">
                        <p>Giảm giá</p>
                        <span>89,000 đ</span>
                    </div>
                    <div className="flex justify-between items-center mt-[8px] mb-[16px] text-caption font-semibold">
                        <p>Phí vận chuyển</p>
                        <p>Miễn phí</p>
                    </div>
                    <div className="my-[10px]">
                        <hr className="border-dashed border border-bg-text" />
                        <div className="flex justify-between items-center py-[8px] text-red1 text-sub-heading-bold">
                            <h3>Tổng Tiền</h3>
                            <span>1,720,555 đ</span>
                        </div>
                        <hr className="border-dashed border border-bg-text" />
                        <button type="submit" className="flex justify-center items-center mt-[20px] bg-red1 text-white uppercase text-caption-bold h-[40px] w-full rounded-[8px]">Hoàn thành đơn hàng</button>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default InfoCheckout