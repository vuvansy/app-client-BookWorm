"use client"

import { useCurrentApp } from "@/context/app.context";
import { sendRequest } from "@/utils/api";
import { Empty } from "antd";
import Link from "next/link"
import { useEffect, useState } from "react";


const TableHistoryOrder = () => {

    const { user } = useCurrentApp();
    const [orders, setOrders] = useState<IHistory[] | null>(null);

    useEffect(() => {
        if (!user?.id) return;
        const fetchHistoryOrder = async () => {
            const res = await sendRequest<IBackendRes<IHistory[]>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order/${user?.id}`,
                method: "GET"
            });
            if (res?.data) {
                setOrders(res.data);
            }
        }
        fetchHistoryOrder();
    }, [user?.id])

    const orderStatusMap: Record<number, string> = {
        0: "Chờ Xác Nhận",
        1: "Đã Xác Nhận",
        2: "Đang Vận Chuyển",
        3: "Đã Giao Hàng",
        4: "Đã hủy"
    };
    const getStatusLabel = (status: number) => orderStatusMap[status] || "Không xác định";
    if (orders === null) return null;
    return (
        <div className="py-[20px] ] px-[10px]">
            {orders.length > 0 ? (
                <table className="table-auto border-collapse w-full text-[15px]">
                    <thead>
                        <tr>
                            <th className="p-[10px] text-left">Mã Đơn Hàng</th>
                            <th className="p-[10px] text-left">Ngày Đặt Hàng</th>
                            <th className="p-[10px]">Tổng Tiền</th>
                            <th className="p-[10px]">Hình thức thanh toán</th>
                            <th className="p-[10px]">Trạng Thái</th>
                            <th className="p-[10px]">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-y odd:bg-gray-100 even:bg-white text-caption">
                                <td className="p-[10px] border-b border-solid border-[#ddd]">{order._id}</td>
                                <td className="p-[10px] text-left border-b border-solid border-[#ddd]">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="p-[10px] text-center text-price-special font-semibold border-b border-solid border-[#ddd]">
                                    {new Intl.NumberFormat("vi-VN").format(order.order_total + order.shippingPrice)} đ
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    {order.id_payment?.name || "Không xác định"}
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    {getStatusLabel(order.status)}
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    <Link href={`/profile/order/${order._id}`} className="py-[6px] px-[16px] bg-price-special !text-white rounded-lg">
                                        Chi Tiết
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
    )
}

export default TableHistoryOrder