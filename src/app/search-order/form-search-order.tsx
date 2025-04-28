'use client'
import { useCurrentApp } from '@/context/app.context';
import dayjs from 'dayjs';
import { App, Button, Card, Form, Input } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type FieldType = {
    id_order?: string;
};

export default function FormSearchOrder() {
    const { data: session } = useSession();
    const id_user = session?.user.id;
    const { message, modal, notification } = App.useApp();
    const [form] = Form.useForm();
    const router = useRouter();
    const [orderData, setOrderData] = useState<IHistory | null>(null);

    const handleSearchOrder = () => {
        if (!session) {
            message.warning("Bạn cần đăng nhập để tra cứu đơn hàng!");
            router.push(`/auth/signin?redirect=/search-order`);
            return;
        }
        router.push("/search-order");
    };

    const onFinish = async (values: any) => {
        try {
            const { id_order } = values;
            const data = { id_user, id_order };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order/detail`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            )
            const d = await res.json();
            if (d.data) {
                //success
                message.success(d.message);
                setOrderData(d.data);

            } else {
                message.error(d.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const orderStatusMap: Record<number, string> = {
        0: "Chờ Xác Nhận",
        1: "Đã Xác Nhận",
        2: "Đang Vận Chuyển",
        3: "Đã Giao Hàng",
        4: "Đã hủy"
    };
    const isPaidStatusMap: Record<string, string> = {
        "false": "Chưa Thanh Toán",
        "true": "Đã Thanh Toán",
    };
    const getOrderStatusLabel = (status: number) => orderStatusMap[status] || "Không xác định";
    const getIsPaidStatusLabel = (status: boolean) => isPaidStatusMap[String(status)] || "Không xác định";

    // Function to format address properly
    const formatAddress = (address: any) => {
        if (!address) return "";

        const parts = [];

        if (address.street) parts.push(address.street);
        if (address.ward && address.ward.name) parts.push(address.ward.name);
        if (address.district && address.district.name) parts.push(address.district.name);
        if (address.city && address.city.name) parts.push(address.city.name);

        // Join only non-empty parts with commas
        return parts.join(", ");
    };

    return (
        <>
            <Form
                form={form}
                name="basic"
                className='max-w-[800px]'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item<FieldType>
                    label="Mã Đơn Hàng"
                    name="id_order"
                >
                    <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit" className='w-[44px] !bg-red1 !text-body-bold' onClick={handleSearchOrder}>Tra Cứu</Button>
            </Form>

            {orderData && (
                <Card title="Thông Tin Đơn Hàng" className='mt-5'>
                    <div className="py-2  justify-center  ">
                        <div className="w-full">
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Mã Đơn Hàng:</span>
                                <span className='text-caption flex justify-end'>{orderData._id}</span>
                            </div>
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Khách Hàng:</span>
                                <span className='text-caption flex justify-end'>{orderData.fullName}</span>
                            </div>
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Ngày Đặt Hàng:</span>
                                <span className='text-caption flex justify-end'>{dayjs(orderData.createdAt).format('DD-MM-YYYY')}</span>
                            </div>
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Trạng Thái Đơn Hàng:</span>
                                <span className='text-caption flex justify-end'>{getOrderStatusLabel(orderData.status)}</span>
                            </div>
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Trạng Thái Thanh Toán:</span>
                                <span className='text-caption flex justify-end'>{getIsPaidStatusLabel(orderData.isPaid)}</span>
                            </div>
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Phương Thức Thanh Toán:</span>
                                <span className='text-caption flex justify-end'>{orderData?.id_payment?.name}</span>
                            </div>
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Phương Thức Vận Chuyển:</span>
                                <span className='text-caption flex justify-end'>{orderData.id_delivery?.name}</span>
                            </div>
                            <div className='grid grid-cols-2 py-2'>
                                <span className='text-caption '>Địa Chỉ Giao Hàng:</span>
                                <span className='text-caption flex justify-end'>{formatAddress(orderData.address)}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}
