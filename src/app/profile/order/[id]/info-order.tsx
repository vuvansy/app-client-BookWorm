"use client"

import { sendRequest } from "@/utils/api";
import { App, Button, Spin } from "antd"
import { useState } from "react";
import Swal from "sweetalert2";
import useSWR, { mutate } from "swr";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

interface IProps {
    id: string | null | undefined;
}

const InfoOrder = (props: IProps) => {
    const { message } = App.useApp();
    const { id } = props;

    const { data, error, isLoading } = useSWR<IBackendRes<IOrder>>(
        id ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order-id/${id}` : null,
        fetcher
    );

    if (error) return <div>Lỗi tải dữ liệu</div>;
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Spin size="large">
                    <span className="">Loading...</span>
                </Spin>
            </div>
        );
    }
    if (!data) return <div>Không có dữ liệu</div>;
    const order = data.data;

    const handleCancelOrder = async () => {
        if (!order) return;

        try {
            const res = await sendRequest<IBackendRes<IOrder>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order/update-status/${order._id}`,
                method: "PUT",
                body: { status: 4 }
            });
            if (res.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Đơn hàng đã được hủy thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "#ffffff",
                    customClass: { title: "swal-title" },
                });
                mutate(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order-id/${id}`, {
                    ...data,
                    data: { ...order, status: 4 }
                }, false);
            } else {
                message.error(res.message || "Hủy đơn hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi hủy đơn hàng:", error);
        }
    };

    const orderStatusMap: Record<number, string> = {
        0: "Chờ Xác Nhận",
        1: "Đã Xác Nhận",
        2: "Đang Vận Chuyển",
        3: "Đã Giao Hàng",
        4: "Đã hủy"
    };
    const getStatusColor = (status: number | undefined) => {
        switch (status) {
            case 1: return "bg-blue-500";
            case 2: return "bg-[#2db7f5]";
            case 3: return "bg-green-500";
            case 4: return "bg-red-500";
            default: return "bg-yellow-500";
        }
    };
    const getStatusLabel = (status: number) => orderStatusMap[status] || "Không xác định";
    const address = typeof order?.address === "string" ? JSON.parse(order.address) : order?.address;
    return (
        <>
            <div className="flex gap-2 mb-[8px]">
                <span className="text-caption-bold">Mã Đơn Hàng:</span>
                <p>{order?._id}</p>
            </div>
            <div className="flex gap-2 mb-[8px]">
                <span className="text-caption-bold">Tên Khách Hàng:</span>
                <p>{order?.fullName}</p>
            </div>
            <div className="flex gap-2 mb-[8px]">
                <span className="text-caption-bold">Địa Chỉ Giao Hàng:</span>
                <p>
                    {`${address?.street}, ${address?.ward?.name}, ${address?.district?.name}, ${address?.city?.name}`}
                </p>
            </div>
            <div className="flex gap-2 mb-[8px]">
                <span className="text-caption-bold">Email:</span>
                <p>{order?.email}</p>
            </div>
            <div className="flex gap-2 mb-[8px]">
                <span className="text-caption-bold">Số Điện Thoại:</span>
                <p>{order?.phone}</p>
            </div>
            <div className="flex gap-2 mb-[6px]">
                <span className="text-caption-bold">Ngày Đặt Hàng:</span>
                {new Date(order?.createdAt ?? Date.now()).toLocaleString()}
            </div>
            <div className="flex gap-6 items-center">
                <div className="flex gap-2">
                    <span className="text-caption-bold">Trạng Thái:</span>
                    <span className={`${getStatusColor(order?.status)} text-white px-2 py-[2px] rounded-md font-medium`}>
                        {getStatusLabel(order?.status as number)}
                    </span>
                </div>
                {order?.status === 0 && (
                    <Button
                        danger
                        size="small"
                        type="dashed"
                        onClick={handleCancelOrder}
                    >
                        Hủy
                    </Button>
                )}
            </div>

        </>
    )
}

export default InfoOrder