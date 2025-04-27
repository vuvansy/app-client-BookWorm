'use client';

import { App, Button, Result, Skeleton } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


const ReturnURL = () => {
    const searchParams = useSearchParams();
    const paymentRef = searchParams?.get("vnp_TxnRef") ?? "";
    const responseCode = searchParams?.get("vnp_ResponseCode") ?? "";

    const [loading, setLoading] = useState<boolean>(true);
    const { notification } = App.useApp();
    const hasFetched = useRef(false);
    useEffect(() => {
        if (paymentRef && !hasFetched.current) {
            hasFetched.current = true; 
            
            const changePaymentStatus = async () => {
                setLoading(true);
                const isPaid = responseCode === "00";
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order/update-payment-status`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            orderId: paymentRef,
                            isPaid: isPaid
                        }),
                    });

                    const data = await res.json();

                    if (res.ok) {
                        // Xử lý khi API thành công (nếu cần)
                    } else {
                        notification.error({
                            message: "Có lỗi xảy ra",
                            description: data.message && Array.isArray(data.message) ? data.message[0] : data.message,
                            duration: 5
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: "Lỗi kết nối",
                        description: "Không thể cập nhật trạng thái thanh toán.",
                        duration: 5
                    });
                }

                setLoading(false);
            };

            changePaymentStatus();
        }
    }, [paymentRef, responseCode]);

    return (
        <div className='container bg-white rounded-lg'>
            {loading ? (
                <div style={{ padding: 50 }}>
                    <Skeleton active />
                </div>
            ) : (
                <>
                    {responseCode === "00" ? (
                        <Result
                            status="success"
                            title="Đặt hàng thành công"
                            subTitle="Hệ thống đã ghi nhận thông tin đơn hàng của bạn."
                            extra={[
                                <Button key="home">
                                    <Link href={"/"} type="primary">
                                        Trang Chủ
                                    </Link>
                                </Button>,

                                <Button key="history">
                                    <Link href={"/profile/order"} type="primary">
                                        Lịch sử mua hàng
                                    </Link>
                                </Button>,
                            ]}
                        />
                    ) : (
                        <Result
                            status="error"
                            title="Giao dịch thanh toán không thành công"
                            subTitle="Vui lòng liên hệ admin để được hỗ trợ."
                            extra={
                                <Button type="primary" key="console">
                                    <Link href={"/"}>Trang Chủ</Link>
                                </Button>
                            }
                        />
                    )}
                </>
            )}
        </div>
    )
}
export default ReturnURL