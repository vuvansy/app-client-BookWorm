'use client'
import { sendRequest } from '@/utils/api';
import { App, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { GrFormNext } from "react-icons/gr";
import { PiSealPercentBold } from 'react-icons/pi';


const MoreCoupon = () => {
    const { message, modal, notification } = App.useApp();
    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getLatestCoupons = (coupons: ICoupon[]): ICoupon[] => {
        return coupons
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 4);
    };
    const latestCoupons = getLatestCoupons(coupons);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                setLoading(true);
                const res = await sendRequest<IBackendRes<ICoupon[]>>({
                    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/coupon`,
                    method: 'GET',
                });

                if (res.data) {
                    setCoupons(res.data);
                }
            } catch (error) {
                message.error('Lỗi khi lấy dữ liệu mã giảm giá');
                console.log('Error fetching coupons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    const showModal = () => {

        setIsOpen(true);
    };

    const handleOk = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };
    const formatNumber = (number: number) => {
        if (number >= 1000) {
            const formattedNumber = (number / 1000).toFixed(1);
            return formattedNumber.endsWith('.0') ? formattedNumber.slice(0, -2) + 'K' : formattedNumber + 'K';
        }
        return number;
    }
    return (
        <div>
            <div onClick={showModal} className="w-[115px] flex items-center justify-center text-caption text-blue-text-bold cursor-pointer">Xem thêm <GrFormNext /> </div>
            <Modal

                open={isOpen}
                onCancel={handleCancel}
                maskClosable={true}
                footer={null}  // Ẩn phần footer
            >
                <div>
                    <div className="flex items-center">
                        <p className="text-info-bold">Mã giảm giá</p>
                    </div>
                    <div className="mt-3 max-h-[350px] overflow-y-auto">
                        {coupons.map((coupon, index) => (
                            <div key={index} className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2">
                                <div className="bg-yellow-1 h-[100px] w-[100px] rounded-lg flex justify-center items-center">
                                    <PiSealPercentBold className="text-[40px] text-white" />
                                </div>
                                <div className='py-1 md:py-0'>
                                    <h3 className="uppercase font-semibold truncate w-[200px] md:w-[300px]">Mã Giảm {coupon.value}%</h3>
                                    <div className='text-caption text-price-old pt-1 pb-4'>
                                        {coupon.description}
                                    </div>
                                    <div className='text-caption text-blue-text'>
                                        HSD: {coupon.end_date ? new Date(coupon.end_date).toLocaleDateString() : 'N/A'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
};
export default MoreCoupon;
