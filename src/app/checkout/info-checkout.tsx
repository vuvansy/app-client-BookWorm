"use client"

import { Select } from "antd";
import { MdOutlinePayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import { useEffect, useMemo, useState } from "react";
const { TextArea } = Input;
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCurrentApp } from "@/context/app.context";
import { useRouter } from "next/navigation";

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
    const { user } = useCurrentApp();
    const router = useRouter();

    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [clientTotal, setClientTotal] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

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
        setClientTotal(total);
    }, [total]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCoupon = localStorage.getItem("appliedCoupon");
            if (savedCoupon) {
                const couponData = JSON.parse(savedCoupon);
                setAppliedCoupon({
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

    console.log(user);

    useEffect(() => {
        if (!user) {
            router.replace("/login");
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
                shippingMethod: 0,
                paymentMethod: 0
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
            console.log("📌 Cập nhật Quận/Huyện:", user.address.district.key);
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


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const selectedCity = cities.find(city => city.Id === values.city);
        const selectedDistrict = districts.find(district => district.Id === values.district);
        const selectedWard = wards.find(ward => ward.Id === values.ward);

        const formattedData = {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            address: {
                city: selectedCity ? { key: selectedCity.Id, name: selectedCity.Name } : null,
                district: selectedDistrict ? { key: selectedDistrict.Id, name: selectedDistrict.Name } : null,
                ward: selectedWard ? { key: selectedWard.Id, name: selectedWard.Name } : null,
                street: values.street,
            },
            note: values.note,
            shippingMethod: values.shippingMethod,
            paymentMethod: values.paymentMethod,
        };

        console.log("Formatted Data:", formattedData);
    };

    return (
        <Form
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
                shippingMethod: 0,
                paymentMethod: 0,
            }}
            className="flex justify-between pb-[20px]"
        >
            <div className="basis-8/12 ">
                <div className="bg-white rounded-lg px-[16px] py-[8px]">
                    <div className="uppercase py-[8px] text-body-bold">Địa chỉ giao hàng</div>
                    <div>
                        <div className="flex justify-between items-center gap-x-4">
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
                                className="basis-6/12 !mb-3"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                style={{ minHeight: "70px" }}
                                className="basis-6/12 !mb-3"
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
                        <div className="flex justify-between items-center gap-x-4">
                            <Form.Item<FieldType>
                                label="Chọn Tỉnh/Thành Phố"
                                name="city"
                                rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố' }]}
                                className="basis-4/12 !mb-3"
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
                                className="basis-4/12 !mb-3"
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
                                className="basis-4/12 !mb-3"
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
                        <div className="flex justify-between items-center gap-x-4">
                            <Form.Item<FieldType>
                                name="shippingMethod"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức Vận chuyển!' }]}
                                className="basis-6/12"
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
                                        defaultValue={0}
                                        options={[
                                            { value: 0, label: "Giao hàng nhanh" },
                                            { value: 1, label: "Giao hàng tiết kiệm" },
                                        ]}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="paymentMethod"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                                className="basis-6/12"
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
                                        defaultValue={0}
                                        options={[
                                            { value: 0, label: "Thanh toán tiền mặt khi nhận hàng(COD)" },
                                            { value: 1, label: "Thanh toán qua VNPAY" },
                                        ]}
                                    />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>

            <div className="basis-4/12 pl-[15px]">
                <div className="bg-white rounded-lg px-[16px] py-[8px]">
                    <h2 className="text-body-bold uppercase pt-2">Đơn hàng</h2>
                    <div className="flex justify-between items-center my-[8px] text-caption font-semibold">
                        <p>Tạm tính</p>
                        <span>{new Intl.NumberFormat("vi-VN").format(clientTotal) + " đ"}</span>
                    </div>
                    <div className="flex justify-between items-center my-[8px] text-caption font-semibold">
                        <p>Giảm giá</p>
                        <span>
                            - {new Intl.NumberFormat("vi-VN").format(appliedCoupon?.discount || 0)} đ
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-[8px] mb-[16px] text-caption font-semibold">
                        <p>Phí vận chuyển</p>
                        <p>Miễn phí</p>
                    </div>
                    <div className="my-[10px]">
                        <hr className="border-dashed border border-bg-text" />
                        <div className="flex justify-between items-center py-[8px] text-red1 text-sub-heading-bold">
                            <h3>Tổng Tiền</h3>
                            <span>
                                {new Intl.NumberFormat("vi-VN").format(
                                    clientTotal - (appliedCoupon?.discount || 0)
                                )} đ
                            </span>
                        </div>
                        <hr className="border-dashed border border-bg-text" />
                        <button
                            type="submit"
                            className="flex justify-center items-center mt-[20px] bg-red1 text-white uppercase text-caption-bold h-[40px] w-full rounded-[8px]">
                            Xác Nhận Thanh Toán
                        </button>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default InfoCheckout