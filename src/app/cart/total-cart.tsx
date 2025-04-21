"use client"

import { BsGift } from "react-icons/bs";
import { GrFormNext } from "react-icons/gr";
import { App, Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import { PiSealPercentBold } from "react-icons/pi";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormProps } from 'antd';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { RiCoupon3Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type FieldType = {
    code?: string;

};
interface IProps {
    dataCoupon: ICoupon[];
}

const TotalCart = (props: IProps) => {
    const { data: session } = useSession();

    const { dataCoupon } = props

    const [form] = Form.useForm();
    const { message } = App.useApp();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [discount, setDiscount] = useState<number>(0);
    const [couponCode, setCouponCode] = useState<string>("");
    const [minTotalRequired, setMinTotalRequired] = useState<number>(0);
    const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);

    const cartItems = useSelector((state: RootState) => state.cart.items || []) as ICart[];
    const total = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + (item.detail.price_new ?? 0) * item.quantity,
                0
            ),
        [cartItems]
    );

    useEffect(() => {
        const savedCoupon = localStorage.getItem("appliedCoupon");
        if (savedCoupon) {
            const coupon = JSON.parse(savedCoupon);
            if (total < coupon.min_total) {
                localStorage.removeItem("appliedCoupon");
                setAppliedCouponCode(null);
                setCouponCode("");
                setDiscount(0);
                setMinTotalRequired(0);
            } else {
                setAppliedCouponCode(coupon.code);
                setCouponCode(coupon.code);
                setDiscount(coupon.discount);
                setMinTotalRequired(coupon.min_total);
            }
        }
    }, [total]);

    useEffect(() => {
        if (couponCode && total < minTotalRequired) {
            message.warning("Tổng đơn hàng không còn đủ điều kiện áp dụng mã giảm giá.");
            setAppliedCouponCode(null);
            setCouponCode("");
            setDiscount(0);
            setMinTotalRequired(0);
            localStorage.removeItem("appliedCoupon");
        }
    }, [total, minTotalRequired]);

    // const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    //     try {
    //         const res = await fetch(
    //             `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/coupon/apply`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ code: values.code })
    //             })
    //         const data: IBackendRes<ICoupon> = await res.json();
    //         if (res.ok) {
    //             const { code, max_value, min_total, value, _id, status } = data.data as ICoupon;
    //             if (status !== "active") {
    //                 message.warning("Mã giảm giá hiện không khả dụng.");
    //                 return;
    //             }
    //             if (total < min_total) {
    //                 message.warning(
    //                     `Mã giảm giá chỉ áp dụng cho đơn hàng từ ${new Intl.NumberFormat(
    //                         "vi-VN"
    //                     ).format(min_total)} đ trở lên.`
    //                 );
    //                 return;
    //             }
    //             const discountPercent = (value / 100) * total;
    //             const discountValue = Math.min(discountPercent, max_value);

    //             message.success("Mã đã được áp dụng");
    //             setDiscount(discountValue);
    //             setCouponCode(values.code ?? "");
    //             setMinTotalRequired(min_total);
    //             setAppliedCouponCode(values.code ?? "");

    //             // localStorage
    //             localStorage.setItem("appliedCoupon", JSON.stringify({
    //                 _id,
    //                 code,
    //                 discount: discountValue,
    //                 min_total: min_total
    //             }));

    //         } else {
    //             message.error(data.message);
    //             setDiscount(0);
    //             setCouponCode("");
    //             setMinTotalRequired(0);
    //         }

    //     } catch (error) {
    //         console.error("Lỗi khi áp dụng mã:", error);
    //     }
    // };



    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/coupon/apply`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code: values.code })
                });

            const data: IBackendRes<ICoupon> = await res.json();

            if (!res.ok) {
                message.error(data.message || "Mã giảm giá không hợp lệ");
                return;
            }

            const { code, max_value, min_total, value, _id, status } = data.data as ICoupon;

            if (status !== "active") {
                message.warning("Mã giảm giá hiện không khả dụng.");
                return;
            }

            if (total < min_total) {
                message.warning(
                    `Mã giảm giá chỉ áp dụng cho đơn hàng từ ${new Intl.NumberFormat("vi-VN").format(min_total)} đ trở lên.`
                );
                return;
            }

            // Hợp lệ → tính giảm giá & áp dụng
            const discountPercent = (value / 100) * total;
            const discountValue = Math.min(discountPercent, max_value);

            message.success("Mã đã được áp dụng");

            setDiscount(discountValue);
            setCouponCode(code);
            setMinTotalRequired(min_total);
            setAppliedCouponCode(code);

            // Lưu localStorage
            localStorage.setItem("appliedCoupon", JSON.stringify({
                _id,
                code,
                discount: discountValue,
                min_total: min_total
            }));

        } catch (error) {
            console.error("Lỗi khi áp dụng mã:", error);
            message.error("Đã có lỗi xảy ra khi áp dụng mã.");
            // Không reset trạng thái ở đây nữa
        }
    };


    const handleCheckout = () => {
        if (!session) {
            message.warning("Bạn cần đăng nhập để tiếp tục thanh toán!");
            router.push(`/auth/signin?redirect=/checkout`);
            return;
        }
        router.push("/checkout");
    };

    const showModal = () => {
        setIsModalOpen(true);
        document.body.classList.add("modal-open");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        document.body.classList.remove("modal-open");
    };

    return (
        <div className="basis-full lg:basis-4/12 md:pl-0 lg:pl-[15px]">
            <div className="bg-white rounded-lg px-[15px]">
                <div className="h-[50px] flex justify-between items-center">
                    <div
                        onClick={showModal}
                        className="flex items-center gap-x-2 text-blue-text cursor-pointer">
                        <RiCoupon3Fill className="text-[18px]" />
                        <span className="text-caption">KHUYẾN MÃI</span>
                    </div>

                    <div onClick={showModal} className="flex items-center cursor-pointer text-blue-text text-caption">
                        Xem thêm
                        <GrFormNext className="text-[18px]" />
                    </div>
                    <Modal
                        open={isModalOpen}
                        onCancel={handleCancel}
                        maskClosable={true}
                        footer={null}
                    >
                        <div className="text-red1 uppercase flex items-center gap-x-2">
                            <BsGift className="text-[18px]" />
                            Chọn mã khuyến mãi
                        </div>
                        <div className="py-[10px]">
                            <Form
                                form={form}
                                name="form-code"
                                className='!relative h-[36px]'
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item<FieldType>
                                    name="code"
                                    className='!mb-0 '
                                >
                                    <Input placeholder="Nhập mã khuyến mãi/quà tặng" className='h-[36px]' />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" className='!flex justify-center items-center !absolute top-1/2 transform -translate-y-1/2 right-0 !bg-[#FF0000] !border-solid !border-2 !rounded-none !rounded-r-[6px] !px-[12px] !h-[36px]'>
                                    Áp dụng
                                </Button>
                            </Form>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="text-info-bold">Mã giảm giá</p>
                                <p className="text-info-light text-gray-1">Áp dụng tối đa: 1</p>
                            </div>
                            <div className="mt-3 max-h-[320px] overflow-y-auto">
                                {/* {
                                    dataCoupon.map((coupon) => (
                                        <div key={coupon._id} className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2">
                                            <div className="relative flex flex-col items-center justify-center min-w-[100px] h-[100px] bg-yellow-400 rounded-lg">
                                                <PiSealPercentBold className="text-[40px] text-white" />
                                                <span className="text-sm font-semibold text-white">Mã giảm</span>
                                            </div>
                                            <div className="w-full">
                                                <h3 className="font-semibold">Mã Giảm {coupon.value}% - Toàn Sàn</h3>
                                                <div>
                                                    <p className="font-semibold">CODE: <span>{coupon.code}</span></p>
                                                </div>
                                                <p>{coupon.description}</p>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">HSD: {new Date(coupon.end_date).toLocaleDateString("vi-VN")}</span>
                                                    <button
                                                        className={`py-[2px] px-2 rounded mr-3 ${appliedCouponCode === coupon.code
                                                            ? "border border-blue-500 text-blue-500"
                                                            : "bg-blue-500 text-white"
                                                            }`}
                                                        onClick={() => {
                                                            if (appliedCouponCode === coupon.code) {
                                                                setAppliedCouponCode(null);
                                                                setCouponCode("");
                                                                setDiscount(0);
                                                                setMinTotalRequired(0);
                                                                message.info("Mã giảm giá đã được gỡ bỏ");
                                                                localStorage.removeItem("appliedCoupon");
                                                            } else {
                                                                form.setFieldsValue({ code: coupon.code });
                                                                form.submit();
                                                            }
                                                        }}
                                                    >
                                                        {appliedCouponCode === coupon.code ? "Đã áp dụng" : "Áp dụng"}
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                } */}

                                {dataCoupon.length === 0 ? (
                                    <p>Không có mã giảm giá.</p>
                                ) : (
                                    <>
                                        {/* MÃ KHẢ DỤNG */}
                                        {dataCoupon
                                            .filter(coupon => total >= coupon.min_total && coupon.status === 'active')
                                            .map(coupon => (
                                                <div key={coupon._id} className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2">
                                                    <div className="relative flex flex-col items-center justify-center min-w-[100px] h-[100px] bg-yellow-400 rounded-lg">
                                                        <PiSealPercentBold className="text-[40px] text-white" />
                                                        <span className="text-sm font-semibold text-white">Mã giảm</span>
                                                    </div>
                                                    <div className="w-full text-[12px] sm:text-[14px]">
                                                        <h3 className="font-semibold">Giảm {coupon.value}%</h3>
                                                        <p className="font-semibold">CODE: {coupon.code}</p>
                                                        <p>{coupon.description}</p>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">HSD: {new Date(coupon.end_date).toLocaleDateString("vi-VN")}</span>
                                                            <button
                                                                className={`py-[2px] px-2 rounded mr-3 ${appliedCouponCode === coupon.code
                                                                    ? "border border-blue-500 text-blue-500"
                                                                    : "bg-blue-500 text-white"
                                                                    }`}
                                                                onClick={() => {
                                                                    if (appliedCouponCode === coupon.code) {
                                                                        setAppliedCouponCode(null);
                                                                        setCouponCode("");
                                                                        setDiscount(0);
                                                                        setMinTotalRequired(0);
                                                                        message.info("Mã giảm giá đã được gỡ bỏ");
                                                                        localStorage.removeItem("appliedCoupon");
                                                                    } else {
                                                                        form.setFieldsValue({ code: coupon.code });
                                                                        form.submit();
                                                                    }
                                                                }}
                                                            >
                                                                {appliedCouponCode === coupon.code ? "Đã áp dụng" : "Áp dụng"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        {/* MÃ KHÔNG ĐỦ ĐIỀU KIỆN */}
                                        {dataCoupon
                                            .filter(coupon => total < coupon.min_total || coupon.status !== 'active')
                                            .map(coupon => (
                                                <div
                                                    key={coupon._id}
                                                    className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2 opacity-50"
                                                >
                                                    <div className="relative flex flex-col items-center justify-center min-w-[100px] h-[100px] bg-gray-300 rounded-lg">
                                                        <PiSealPercentBold className="text-[40px] text-white" />
                                                        <span className="text-sm font-semibold text-white">Không hợp lệ</span>
                                                    </div>
                                                    <div className="w-full text-[12px] sm:text-[14px]">
                                                        <h3 className="font-semibold line-through">Giảm {coupon.value}%</h3>
                                                        <p className="font-semibold">CODE: {coupon.code}</p>
                                                        <p>{coupon.description}</p>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">HSD: {new Date(coupon.end_date).toLocaleDateString("vi-VN")}</span>
                                                            <button
                                                                className="py-[2px] px-1 sm:px-2 rounded mr-3 border border-gray-400 text-gray-400 cursor-not-allowed"
                                                                disabled
                                                            >
                                                                Không áp dụng
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                )}

                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="pb-[16px]">
                    <div className="font-semibold">ĐƠN HÀNG</div>
                    <p className=" pt-[8px] text-[12px] sm:text-info-bold">Đừng quên nhập mã giảm giá</p>
                    <div className="flex justify-between text-[14px] sm:text-body1 py-[10px] text-[#333333]">
                        <p className="basis-4/6">Thành tiền</p>
                        <span className="basis-2/6 flex justify-end items-center">{new Intl.NumberFormat("vi-VN").format(total) + " đ"}</span>
                    </div>
                    {couponCode && (
                        <div className="flex justify-between text-[14px] sm:text-body1 pb-[10px] text-[#333333]">
                            <p className="basis-4/6">
                                Giảm giá (Nhập mã thành công - Mã {couponCode} - Giảm tối đa {discount.toLocaleString("vi-VN")}đ)
                            </p>
                            <span className="basis-2/6 flex justify-end items-center text-[14px]">
                                - {discount.toLocaleString("vi-VN")} đ
                            </span>
                        </div>
                    )}
                    <div className="border border-[#ededed]"></div>
                    <div className="flex justify-between items-center text-red1 text-caption-bold sm:text-sub-heading-bold py-[10px]">
                        <span>Tổng Số Tiền:</span>
                        <span>{new Intl.NumberFormat("vi-VN").format(total - discount) + " đ"}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="flex justify-center items-center bg-red1 !text-white uppercase text-caption-bold h-[40px] w-full rounded-[8px]">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TotalCart