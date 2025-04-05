"use client"

import { useState } from "react";
import { Modal, Form, Input, Rate, App, Button } from 'antd';
const { TextArea } = Input;
import type { FormProps } from 'antd';
import { SyncOutlined } from "@ant-design/icons";

interface IProps {
    modalOpen: boolean;
    setModalOpen: (v: boolean) => void;
    orderDetail: IOrderDetailTable | null;
    user: IUser | null;
    markAsReviewed: (orderDetailId: string) => void;
}

type FieldType = {
    comment?: string;
    rating?: number;
};
const ModalReviews = (props: IProps) => {
    const { modalOpen, setModalOpen, orderDetail, user, markAsReviewed } = props
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setModalOpen(false);
        form.resetFields();
        document.body.classList.remove("modal-open");
    };

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        console.log("Dữ liệu gửi:", values);
        if (!orderDetail?._id) {
            return message.error("Không tìm thấy sản phẩm!");
        }
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_user: user?.id,
                    id_order_detail: orderDetail._id,
                    comment: values.comment,
                    rating: values.rating,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                message.success("Đánh giá thành công!");
                markAsReviewed(orderDetail._id);
                handleCancel(); // Đóng modal & reset form
            } else {
                message.error(data.message || "Có lỗi xảy ra!");
            }
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            message.error("Lỗi hệ thống! Vui lòng thử lại.");
        }
        setLoading(false);
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
                form={form}
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
                initialValues={{ comment: "Sản phẩm tuyệt vời!", rating: 5 }}
            >
                <Form.Item<FieldType>
                    name="comment"
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
                            defaultValue={5}
                            onChange={(value) => form.setFieldsValue({ rating: value })}
                        />

                        <Button
                            type="primary"
                            danger
                            htmlType="submit"
                            loading={loading}
                            icon={loading ? <SyncOutlined spin /> : null}
                            className="ml-[20px]"
                        >
                            {loading ? "Đang gửi..." : "GỬI"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalReviews