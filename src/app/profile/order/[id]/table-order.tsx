"use client"

import Image from "next/image"
import React, { useState } from 'react';
import { Modal, Form, Input, Popconfirm, Rate } from 'antd';
const { TextArea } = Input;
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';

type FieldType = {
    review?: string;
    rating?: number;
};

interface IProps {
    dataOrderTable: IOrderDetailTable[] | null;
    order: IOrder | null | undefined;
}

const TableOrder = (props: IProps) => {
    const { dataOrderTable, order } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm(); // Quản lý form

    const showModal = () => {
        setModalOpen(true);
        document.body.classList.add("modal-open"); // Giữ cuộn trang
    };

    const handleCancel = () => {
        setModalOpen(false);
        document.body.classList.remove("modal-open");
    };

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Dữ liệu gửi:", values);
        setModalOpen(false);
        form.resetFields();
    };

    return (
        <div>
            <h3 className="text-center text-body-bold pb-[10px] pt-[20px] uppercase">Thông tin sản phẩm</h3>
            <table className="table-auto border-collapse w-full text-[15px]">
                <thead>
                    <tr>
                        <th className="w-[4%] p-[8px]">STT</th>
                        <th className="w-[14%] p-[8px]">Ảnh</th>
                        <th className="w-[40%] p-[8px] text-left">Sản Phẩm</th>
                        <th className="w-[10%] p-[8px] text-left">Giá</th>
                        <th className="w-[8%] p-[8px]">Số Lượng</th>
                        <th className="w-[10%] p-[8px]">Thành Tiền</th>
                        <th className="w-[14%] p-[8px]">Tác Vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {dataOrderTable?.map((item, index) => (
                        <tr
                            key={item._id}
                            className="border-y border-solid border-[#ced4da] odd:bg-gray-100 even:bg-white text-caption">
                            <th className="text-center">{index + 1}</th>
                            <td className="">
                                <div className="relative w-[110px] h-[110px] mx-auto">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${item.id_book.image}`}
                                        alt="" className="object-cover" fill />
                                </div>
                            </td>
                            <td className="text-left pl-[8px] pr-[20px]">
                                {item.id_book.name}
                            </td>
                            <td className=" text-price-special px-[8px]">
                                <div className="flex flex-col justify-start text-left">
                                    <span className="text-red1 font-semibold">{(item.price).toLocaleString()} đ</span>
                                    <span className="text-caption text-bg-text line-through">{(item.id_book.price_old).toLocaleString()} đ</span>
                                </div>
                            </td>
                            <td className="text-center">
                                {item.quantity}
                            </td>
                            <td className="text-center">
                                <span className="font-semibold ml-3">
                                    {new Intl.NumberFormat("vi-VN").format(Number(item.price) * Number(item.quantity))} đ
                                </span>
                            </td>
                            <td className="text-center">
                                {item.id_order.status === 3 ? (
                                    <button
                                        className="bg-red1 text-white py-[10px] px-[16px] rounded-lg"
                                        onClick={showModal}
                                    >
                                        Đánh giá
                                    </button>
                                ) : (
                                    <Popconfirm
                                        placement="topRight"
                                        title="Không thể đánh giá sản phẩm"
                                        description="Đơn hàng cần được hoàn thành"
                                        icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                                        showCancel={false}
                                        okButtonProps={{ style: { display: 'none' } }}
                                    >
                                        <button className="bg-red1 opacity-50 text-white py-[10px] px-[16px] rounded-lg">
                                            Đánh giá
                                        </button>
                                    </Popconfirm>
                                )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-end gap-2 py-[10px] border-b text-caption">
                <div>Giảm Giá: </div>
                <span>
                    {new Intl.NumberFormat("vi-VN").format(order?.discountAmount ?? 0)} đ
                </span>
            </div>
            <div className="flex items-center justify-end gap-2 py-[10px] border-b text-caption">
                <div>Tổng Tiền: </div>
                <span>
                    {new Intl.NumberFormat("vi-VN").format((order?.order_total ?? 0) + (order?.shippingPrice ?? 0))} đ
                </span>
            </div>
            <Modal
                title="GỬI ĐÁNH GIÁ CỦA BẠN"
                centered
                open={modalOpen}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                <Form
                    form={form} // Gán form để quản lý dữ liệu
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="review"
                        className="!mb-0"
                        rules={[{ required: true, message: 'Thông tin này quan trọng.Vui lòng không để trống.' }]}
                    >
                        <TextArea rows={4} className="!py-[10px] !rounded-none" placeholder="Viết đánh giá sản phẩm của bạn tại đây" />
                    </Form.Item>

                    <Form.Item<FieldType> name="rating"
                        rules={[{ required: true, message: 'Thông tin này quan trọng.Vui lòng không để trống.!' }]}
                    >
                        <div className="border py-[10px] px-[15px] flex items-center gap-3">
                            <span className="text-[15px] font-semibold">Đánh giá</span>
                            <Rate
                                className="text-[16px]"
                                onChange={(value) => form.setFieldsValue({ rating: value })}
                            />
                            <button
                                type="submit"
                                className="py-[7px] px-[25px] border border-red1 text-red1 rounded ml-[20px] hover:bg-red1 hover:text-white"
                            >
                                GỬI
                            </button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TableOrder