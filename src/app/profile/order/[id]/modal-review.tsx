"use client"

import { useState } from "react";
import { Modal, Form, Input, Rate } from 'antd';
const { TextArea } = Input;
import type { FormProps } from 'antd';

interface IProps {
    modalOpen: boolean;
    setModalOpen: (v: boolean) => void;
}

type FieldType = {
    review?: string;
    rating?: number;
};
const ModalReviews = (props: IProps) => {
    const { modalOpen, setModalOpen } = props

    const [form] = Form.useForm();


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
    )
}

export default ModalReviews