"use client"

import { useCurrentApp } from "@/context/app.context";
import { sendRequest } from "@/utils/api";
import { Empty, Spin } from "antd";
import Link from "next/link"
import useSWR from "swr";

const fetcher = (url: string) => sendRequest<IBackendRes<IHistory[]>>({ url, method: "GET" }).then(res => res?.data);

const TableHistoryOrder = () => {

    const { user } = useCurrentApp();
    const { data: orders, error, isLoading } = useSWR(
        user?.id ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order/${user.id}` : null,
        fetcher
    );

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

    return (
        <div className="py-[20px] ] px-[10px]">
            {orders && orders.length > 0 ? (
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
                                    {new Intl.NumberFormat("vi-VN").format(order.order_total + order.shippingPrice - order.discountAmount)} đ
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