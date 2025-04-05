"use client"

import { sendRequest } from "@/utils/api";
import { App, Button, Popconfirm, Spin } from "antd"
import { useEffect, useState } from "react";
import Image from "next/image"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Swal from "sweetalert2";
import useSWR, { mutate } from "swr";
import ModalReviews from "./modal-review";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

interface IProps {
    id: string | null | undefined;
}

const InfoOrder = (props: IProps) => {
    const { message } = App.useApp();
    const { id } = props;
    const { data: session } = useSession();
    const user = session?.user;

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState<IOrderDetailTable | null>(null);
    const [reviewedItems, setReviewedItems] = useState<string[]>([]);
    // Lấy thông tin đơn hàng
    const { data: orderData, error: orderError, isLoading: orderLoading } = useSWR<IBackendRes<IOrder>>(
        id ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order-id/${id}` : null,
        fetcher
    );

    // Lấy chi tiết đơn hàng
    const { data: orderDetailData, error: orderDetailError, isLoading: orderDetailLoading } = useSWR<IBackendRes<IOrderDetailTable[]>>(
        id ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order-detail/${id}` : null,
        fetcher
    );

    const { data: reviewedData, error: reviewedError } = useSWR<IBackendRes<[]>>(
        user?.id ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/review/${user?.id}` : null,
        fetcher
    );

    useEffect(() => {
        if (reviewedData?.data) {
            const reviewedIds = reviewedData.data.map((item: any) => item);
            setReviewedItems(reviewedIds);
        }
    }, [reviewedData]);

    if (orderError || orderDetailError) return <div>Lỗi tải dữ liệu</div>;

    if (orderLoading || orderDetailLoading) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Spin size="large">
                    <span className="">Loading...</span>
                </Spin>
            </div>
        );
    }

    if (!orderData || !orderDetailData) return <div>Không có dữ liệu</div>;

    const order = orderData.data;
    const orderDetails = orderDetailData.data;

    // console.log(orderDetails);
    const handleCancelOrder = async () => {
        if (!order) return;

        try {
            const res = await sendRequest<IBackendRes<IOrder>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order/update-status/${order._id}`,
                method: "PUT",
                body: { status: 4 },
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
                    ...orderData,
                    data: { ...order, status: 4 },
                }, false);
            } else {
                message.error(res.message || "Hủy đơn hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi hủy đơn hàng:", error);
        }
    };

    const handleOpenModal = (orderDetail: IOrderDetailTable) => {
        setSelectedOrderDetail(orderDetail);
        setModalOpen(true);
        document.body.classList.add("modal-open");
    };

    const markAsReviewed = (id_order_detail: string) => {
        setReviewedItems((prev) => [...prev, id_order_detail]);
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
            <div className="py-[10px] text-caption border-b border-[#ced4da]">
                <h3 className="text-center text-body-bold py-[10px] uppercase">Thông tin khách hàng</h3>
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
                    {dayjs(order?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
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
            </div>
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
                        {orderDetails?.map((item, index) => (
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
                                    {order && order.status === 3 ? (
                                        reviewedItems.includes(item._id) ? (
                                            <span className="text-gray-500 font-semibold">Đã đánh giá</span>
                                        ) : (
                                            <button
                                                className="bg-red1 text-white py-[10px] px-[16px] rounded-lg"
                                                onClick={() => handleOpenModal(item)}
                                            >
                                                Đánh giá
                                            </button>
                                        )
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
                    <div>Phí Giao Hàng: </div>
                    <span>
                        {new Intl.NumberFormat("vi-VN").format(order?.shippingPrice ?? 0)} đ
                    </span>
                </div>
                <div className="flex items-center justify-end gap-2 py-[10px] border-b text-caption">
                    <div>Tổng Tiền: </div>
                    <span>
                        {new Intl.NumberFormat("vi-VN").format((order?.order_total ?? 0) + (order?.shippingPrice ?? 0))} đ
                    </span>
                </div>
            </div>
            <ModalReviews
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                orderDetail={selectedOrderDetail}
                user={user as IUser}
                markAsReviewed={markAsReviewed}
            />
        </>
    )
}

export default InfoOrder