"use client"

import { useCurrentApp } from "@/context/app.context";
import { sendRequest } from "@/utils/api";
import { Empty, Spin, Tabs } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link"
import { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

const TableHistoryOrder = () => {
    const [status, setStatus] = useState<string | undefined>(undefined);
    // const { user } = useCurrentApp();
    const { data: session } = useSession();
    const user = session?.user;
    const url = user?.id
        ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order/${user.id}${status ? `?status=${status}` : ""}`
        : null;
    const { data: listOrder, error, isLoading } = useSWR<IBackendRes<IModelPaginate<IHistory>>>(
        url,
        fetcher
    );

    const orders = listOrder?.data?.result;
    const statusCounts = listOrder?.data?.meta?.statusCounts || {
        "": 0,
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <Spin size="large">
                    <span className="text-gray-600">Loading...</span>
                </Spin>
            </div>
        );
    }
    if (error) {
        return <div className="text-red-500 text-center py-4">Lỗi khi lấy dữ liệu đơn hàng!</div>;
    }

    const orderStatusMap: Record<number, string> = {
        0: "Chờ Xác Nhận",
        1: "Đã Xác Nhận",
        2: "Đang Vận Chuyển",
        3: "Đã Giao Hàng",
        4: "Đã hủy"
    };
    const getStatusLabel = (status: number) => orderStatusMap[status] || "Không xác định";
    const items = [
        {
            key: "",
            label: <span>Tất cả ({statusCounts[""] || 0})</span>,
        },
        {
            key: "0",
            label: <span>Chờ xác nhận ({statusCounts["0"] || 0})</span>,
        },
        {
            key: "1",
            label: <span>Đã xác nhận ({statusCounts["1"] || 0})</span>,
        },
        {
            key: "2",
            label: <span>Đang vận chuyển ({statusCounts["2"] || 0})</span>,
        },
        {
            key: "3",
            label: <span>Đã giao hàng ({statusCounts["3"] || 0})</span>,
        },
        {
            key: "4",
            label: <span>Đã hủy ({statusCounts["4"] || 0})</span>,
        },
    ];

    return (
        <>
            <div className="pb-[20px] px-[10px]">
                <Tabs
                    activeKey={status ?? ""}
                    items={items}
                    onChange={(value) => {
                        setStatus(value || undefined);
                    }}
                />
                {orders && orders.length > 0 ? (
                    <table className="table-auto border-collapse w-full text-[15px]">
                        <thead>
                            <tr className="text-[13px] md:text-[14px]">
                                <th className="p-0 sm:p-[10px] text-left">Mã Đơn Hàng</th>
                                <th className="p-0 sm:p-[10px] text-left hidden md:block">Ngày Đặt Hàng</th>
                                <th className="p-0 sm:p-[10px]">Tổng Tiền</th>
                                <th className="p-0 sm:p-[10px] hidden lg:block">Hình thức thanh toán</th>
                                <th className="p-0 sm:p-[10px]">Trạng Thái</th>
                                <th className="p-0 sm:p-[10px]">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-y odd:bg-gray-100 even:bg-white text-[12px] md:text-caption">
                                    <td className="p-0 sm:p-[10px] border-b border-solid border-[#ddd]">{order._id}</td>
                                    <td className="p-0 sm:p-[10px] hidden md:block text-left border-b border-solid border-[#ddd]">
                                        {dayjs(order?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                    <td className="p-0 sm:p-[10px] text-center text-price-special font-semibold border-b border-solid border-[#ddd]">
                                        {new Intl.NumberFormat("vi-VN").format(order.order_total + order.shippingPrice)} đ
                                    </td>
                                    <td className="p-0 sm:p-[10px] hidden lg:block text-center border-b border-solid border-[#ddd]">
                                        {order.id_payment?.name || "Không xác định"}
                                    </td>
                                    <td className="p-0 sm:p-[10px] text-center border-b border-solid border-[#ddd]">
                                        {getStatusLabel(order.status)}
                                    </td>
                                    <td className="p-0 sm:p-[10px] text-center border-b border-solid border-[#ddd]">
                                        <Link href={`/profile/order/${order._id}`} className="py-[2px] px-[8px] md:py-[6px] md:px-[16px] bg-price-special !text-white rounded-lg text-center text-[10px] md:text-caption">
                                            <span className="">Chi Tiết</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex justify-center py-6">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={<span>Bạn chưa có đơn hàng nào để hiển thị</span>}
                        />
                    </div>
                )}
            </div>
        </>

    )
}

export default TableHistoryOrder