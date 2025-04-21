"use client"

import { App, Select } from "antd";
import { MdOutlinePayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import { useEffect, useMemo, useState } from "react";
const { TextArea } = Input;
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { clearCart } from "@/redux/slices/cartSlice";
import { useSession } from "next-auth/react";

type FieldType = {
    fullName: string;
    email?: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    note?: string;
    shippingMethod: number;
    paymentMethod: number;
};

const InfoCheckout = () => {
    const [form] = Form.useForm();
    const { data: session } = useSession();
    const user = session?.user;
    const dispatch = useDispatch();
    const router = useRouter();
    const { message } = App.useApp();
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [clientTotal, setClientTotal] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState<{ _id: string; code: string; discount: number } | null>(null);

    const [listDelivery, setListDelivery] = useState<{ label: string, value: string, price: number }[]>([]);
    const [selectedDelivery, setSelectedDelivery] = useState<string | undefined>(undefined);
    const [shippingPrice, setShippingPrice] = useState<number>(0);

    const [listPayment, setListPayment] = useState<{ label: string, value: string }[]>([]);
    const [selectedPayment, setSelectedPayment] = useState<string | undefined>(undefined);

    const cartItems = useSelector((state: RootState) => state.cart.items || []) as ICart[];
    const total = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + (item.detail.price_new ?? 0) * item.quantity,
                0
            ),
        [cartItems]
    );
    // console.log(total);

    //fetchDelivery
    useEffect(() => {
        const fetchDelivery = async () => {
            const res = await sendRequest<IBackendRes<IDelivery[]>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/delivery`,
                method: "GET"
            })
            if (res && res.data) {
                const d = res.data.map(item => ({
                    label: item.name,
                    value: String(item._id),
                    price: item.price,
                }));
                setListDelivery(d);
                if (d.length > 0) {
                    setSelectedDelivery(d[0].value);
                    setShippingPrice(d[0].price);
                    form.setFieldsValue({ shippingMethod: d[0].value });
                }
            }
        }
        fetchDelivery();
    }, [])
    useEffect(() => {
        if (selectedDelivery) {
            const selectedMethod = listDelivery.find(method => method.value === selectedDelivery);
            setShippingPrice(selectedMethod ? selectedMethod.price : 0);
        }
    }, [selectedDelivery, listDelivery]);
    //fetchPayment
    useEffect(() => {
        const fetchPayment = async () => {
            const res = await sendRequest<IBackendRes<IPayment[]>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/payment`,
                method: "GET"
            })

            if (res && res.data) {
                const d = res.data.map(item => ({
                    label: item.name,
                    value: String(item._id)
                }));
                setListPayment(d);
                if (d.length > 0) {
                    setSelectedPayment(d[0].value);
                    form.setFieldsValue({ paymentMethod: d[0].value });
                }
            }
        }
        fetchPayment();
    }, [])

    useEffect(() => {
        setClientTotal(total);
    }, [total]);
    // console.log("clientTotal", clientTotal);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCoupon = localStorage.getItem("appliedCoupon");
            if (savedCoupon) {
                const couponData = JSON.parse(savedCoupon);
                setAppliedCoupon({
                    _id: couponData._id,
                    code: couponData.code,
                    discount: couponData.discount,
                });

                setClientTotal((prevTotal) => Math.max(0, prevTotal - couponData.discount));
            }
        }
    }, []);

    useEffect(() => {
        const storedCoupon = localStorage.getItem("appliedCoupon");
        if (storedCoupon) {
            setAppliedCoupon(JSON.parse(storedCoupon));
        }
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
            const data = await response.json();
            setCities(data);
        };
        fetchCities();
    }, []);

    useEffect(() => {
        if (!user) {
            router.replace("/auth/signin");
        }
    }, [user, router]);

    useEffect(() => {
        if (user && cities.length > 0) {
            form.setFieldsValue({
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                city: user.address?.city?.key || undefined,
                district: user.address?.district?.key || undefined,
                ward: user.address?.ward?.key || undefined,
                street: user.address?.street || "",
                note: "",
                shippingMethod: selectedDelivery,
                paymentMethod: selectedPayment
            });

            if (user.address?.city?.key) {
                handleCityChange(user.address.city.key);
            }
        }
    }, [user, cities, form]);


    const handleCityChange = (cityId: string) => {
        if (!cities.length) {
            return;
        }
        const selectedCity = cities.find(city => String(city.Id) === String(cityId));
        if (!selectedCity) {
            setDistricts([]);
            setWards([]);
            form.setFieldsValue({
                district: undefined,
                ward: undefined
            });
            return;
        }
        setDistricts(selectedCity.Districts);
        setWards([]);
        form.setFieldsValue({
            district: undefined,
            ward: undefined
        });
    };

    const handleDistrictChange = (districtId: string) => {
        if (!districtId) {
            setWards([]);
            form.setFieldsValue({ ward: undefined });
            return;
        }
        const selectedDistrict = districts.find(d => String(d.Id) === String(districtId));
        if (!selectedDistrict) {
            setWards([]);
            form.setFieldsValue({ ward: undefined });
            return;
        }
        setWards(selectedDistrict.Wards || []);
        form.setFieldsValue({ ward: undefined });
    };

    useEffect(() => {
        if (districts.length > 0 && user?.address?.district?.key) {
            if (districts.some(d => String(d.Id) === String(user?.address?.district?.key))) {
                form.setFieldsValue({ district: user.address.district.key });
                handleDistrictChange(user.address.district.key);
            } else {
                form.setFieldsValue({ district: undefined });
            }
        } else {
            form.setFieldsValue({ district: undefined });
        }
    }, [districts]);

    useEffect(() => {
        if (wards.length > 0) {
            const currentDistrict = form.getFieldValue("district");
            if (!currentDistrict) {
                form.setFieldsValue({ ward: undefined });
            } else if (user?.address?.district?.key === currentDistrict) {
                form.setFieldsValue({ ward: user?.address?.ward?.key || undefined });
            } else {
                form.setFieldsValue({ ward: undefined });
            }
        }
    }, [wards]);


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (isLoading) return;


        setIsLoading(true);
        const selectedCity = cities.find(city => city.Id === values.city);
        const selectedDistrict = districts.find(district => district.Id === values.district);
        const selectedWard = wards.find(ward => ward.Id === values.ward);

        const formattedData = {
            fullName: values.fullName,
            phone: values.phone,
            email: values.email ?? "",
            address: {
                city: selectedCity ? { key: selectedCity.Id, name: selectedCity.Name } : { key: "", name: "" },
                district: selectedDistrict ? { key: selectedDistrict.Id, name: selectedDistrict.Name } : { key: "", name: "" },
                ward: selectedWard ? { key: selectedWard.Id, name: selectedWard.Name } : { key: "", name: "" },
                street: values.street,
            },
            note: values.note,
            products: cartItems.map(item => ({
                _id: item._id,
                quantity: item.quantity,
                detail: { price_new: item.detail.price_new }
            })),
            shippingPrice,
            discountAmount: appliedCoupon?.discount ?? 0,
            isPaid: false,
            id_user: user?.id,
            id_delivery: selectedDelivery,
            id_payment: selectedPayment,
            id_coupons: appliedCoupon?._id ?? null,
        };

        try {
            const selectedPaymentMethod = listPayment.find(method => method.value === selectedPayment);
            //COD
            if (selectedPaymentMethod?.value === "67d1660613d2310d45c29ffb") { // COD
                const order = await createOrder(formattedData);
                if (!order?.data?._id) throw new Error("Không thể tạo đơn hàng.");
                const orderDetails = cartItems.map((item) => ({
                    quantity: item.quantity,
                    price: item.detail.price_new,
                    id_book: item._id,
                    id_order: order?.data?._id
                }));
                await createOrderDetail(orderDetails);
                message.success("Đặt hàng thành công!");
                dispatch(clearCart());
                router.push("/order");
            } else if (selectedPaymentMethod?.value === "67d1663713d2310d45c29ffe") {
                // VNPAY
                const order = await createOrder(formattedData);
                const orderId = order?.data?._id;
                if (!orderId) throw new Error("Không thể tạo đơn hàng.");
                const orderDetails = cartItems.map((item) => ({
                    quantity: item.quantity,
                    price: item.detail.price_new,
                    id_book: item._id,
                    id_order: order?.data?._id
                }));
                await createOrderDetail(orderDetails);


                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/vnpay/create_payment_url`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: cartItems.reduce((sum, item) => {
                            return sum + (item.detail.price_new as number) * item.quantity;
                        }, 0) + shippingPrice - (appliedCoupon?.discount ?? 0),
                        orderId: orderId,
                        bankCode: "",
                        language: "vn",
                    }),
                });
                const data = await response.json();
                if (data.paymentUrl) {
                    dispatch(clearCart());
                    window.location.href = data.paymentUrl;
                } else {
                    throw new Error("Lỗi khi tạo thanh toán VNPAY.");
                }
            }
        } catch (error) {
            console.error(error);
            alert("Đã có lỗi xảy ra.");
        } finally {
            setIsLoading(false);
        }


    };

    // Create order
    async function createOrder(order: any) {
        try {
            const res = await sendRequest<IBackendRes<IHistory>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order`,
                method: "POST",
                body: order,
            });

            if (res.data) {
                return res;
            } else {
                console.error("Lỗi khi tạo đơn hàng:", res);
                return null;
            }
        } catch (error) {
            console.error("Lỗi hệ thống:", error);
            return null;
        }
    }
    // Create order details
    async function createOrderDetail(orderDetails: any) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order-detail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderDetails),
            });
            if (!res.ok) {
                console.error("Lỗi khi tạo đơn hàng chi tiết:", res.status, res.statusText);
                return null;
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Lỗi hệ thống:", error);
            return null;
        }
    }

    return (
        <Form
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className="pb-[20px]"
        >
            <div className="flex justify-between flex-wrap">
                <div className="basis-full md:basis-8/12">
                    <div className="bg-white rounded-lg px-[16px] py-[8px]">
                        <div className="uppercase py-[8px] text-body-bold">Địa chỉ giao hàng</div>

                        <div className="flex justify-between flex-wrap items-center gap-x-4">
                            <Form.Item<FieldType>
                                label="Họ Và Tên"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập họ và tên'
                                    }
                                ]}
                                style={{ minHeight: "70px" }}
                                className="w-full md:w-[calc(50%-8px)] !mb-3"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                style={{ minHeight: "70px" }}
                                className="w-full md:w-[calc(50%-8px)] !mb-3"
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            label="Số Điện Thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!'
                                }
                            ]}
                            className="!mb-3"
                        >
                            <Input />
                        </Form.Item>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Form.Item<FieldType>
                                label="Chọn Tỉnh/Thành Phố"
                                name="city"
                                rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố' }]}
                                className="!mb-3"
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Chọn Tỉnh/Thành Phố"
                                    options={cities.map(city => ({ value: city.Id, label: city.Name }))}
                                    onChange={handleCityChange}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Chọn Quận/Huyện"
                                name="district"
                                rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện' }]}
                                className="!mb-3"
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Chọn Quận/Huyện"
                                    options={districts.map(district => ({ value: district.Id, label: district.Name }))}
                                    onChange={handleDistrictChange}
                                    disabled={!districts.length} // Vô hiệu hóa nếu chưa chọn tỉnh/thành phố

                                />

                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Chọn Phường/Xã"
                                name="ward"
                                rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã' }]}
                                className="!mb-3"
                            >
                                <Select
                                    placeholder="Chọn Phường/Xã"
                                    showSearch
                                    allowClear
                                    options={wards.map(ward => ({ value: ward.Id, label: ward.Name }))}
                                    onChange={(value) => form.setFieldsValue({ ward: value })}
                                    disabled={!wards.length} // Vô hiệu hóa nếu chưa chọn quận/huyện
                                />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            label="Nhập địa chỉ cụ thể"
                            name="street"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ cụ thể!'
                                }
                            ]}
                            className="!mb-3"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Ghi Chú Đơn Hàng"
                            name="note"
                            className="!mb-3"
                        >
                            <TextArea rows={2} />
                        </Form.Item>
                        <div className="flex justify-between flex-wrap items-center gap-x-4">
                            <Form.Item<FieldType>
                                name="shippingMethod"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức Vận chuyển!' }]}
                                className="w-full md:w-[calc(50%-8px)]"
                            >
                                <div>
                                    <div className="mb-2 font-medium flex items-center gap-x-1">
                                        <TbTruckDelivery className="text-[18px]" />
                                        <span>Phương thức Vận chuyển</span>
                                    </div>
                                    <Select
                                        showSearch
                                        allowClear
                                        placeholder="Chọn phương thức vận chuyển"
                                        options={listDelivery}
                                        value={selectedDelivery}
                                        onChange={(value) => {
                                            setSelectedDelivery(value);
                                            form.setFieldsValue({ shippingMethod: value });
                                        }}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="paymentMethod"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                                className="w-full md:w-[calc(50%-8px)]"
                            >
                                <div>
                                    <div className="mb-2 font-medium flex items-center gap-x-1">
                                        <MdOutlinePayment className="text-[18px]" />
                                        <span>Phương thức thanh toán</span>
                                    </div>
                                    <Select
                                        placeholder="Chọn phương thức thanh toán"
                                        showSearch
                                        allowClear
                                        options={listPayment}
                                        value={selectedPayment}
                                        onChange={(value) => {
                                            setSelectedPayment(value);
                                            form.setFieldsValue({ paymentMethod: value });
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="basis-full md:basis-4/12 pl-0 md:pl-[15px]">
                    <div className="bg-white rounded-lg px-[16px] py-[8px]">
                        <h2 className="text-body-bold uppercase pt-2">Đơn hàng</h2>
                        <div className="flex justify-between items-center my-[8px] text-caption font-semibold">
                            <p>Tạm tính</p>
                            <span>{new Intl.NumberFormat("vi-VN").format(total) + " đ"}</span>
                        </div>
                        <div className="flex justify-between items-center my-[8px] text-caption font-semibold">
                            <p>Giảm giá</p>
                            <span>
                                - {new Intl.NumberFormat("vi-VN").format(appliedCoupon?.discount || 0)} đ
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-[8px] mb-[16px] text-caption font-semibold">
                            <p>Phí vận chuyển</p>
                            <p>{new Intl.NumberFormat("vi-VN").format(shippingPrice)}</p>
                        </div>
                        <div className="my-[10px]">
                            <hr className="border-dashed border border-bg-text" />
                            <div className="flex justify-between items-center py-[8px] text-red1 text-sub-heading-bold">
                                <h3>Tổng Tiền</h3>
                                <span>
                                    {new Intl.NumberFormat("vi-VN").format(
                                        total - (appliedCoupon?.discount || 0) + shippingPrice
                                    )} đ
                                </span>
                            </div>
                            <hr className="border-dashed border border-bg-text" />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`flex justify-center items-center mt-[20px] 
                             ${isLoading ? "opacity-70 bg-red1 cursor-not-allowed" : "bg-red1"} 
                             text-white uppercase text-caption-bold h-[40px] w-full rounded-[8px]`}
                            >
                                {isLoading ? "Đang xử lý..." : "Xác Nhận Thanh Toán"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default InfoCheckout