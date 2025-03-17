'use client'
import React, { useEffect, useState } from 'react';
import { App, Modal } from 'antd';

import { PiSealPercentLight } from "react-icons/pi";
import { sendRequest } from '@/utils/api';


const ListCoupon = () => {
    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { message, modal, notification } = App.useApp();

    const getLatestCoupons = (coupons: ICoupon[]): ICoupon[] => {
        return coupons
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 4);
    };
    const latestCoupons = getLatestCoupons(coupons);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

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

    const showModal = (coupon: ICoupon) => {
        setSelectedCoupon(coupon);
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
    if (loading) {
        return <div className="w-full flex justify-center py-4">Đang tải...</div>;
    }

    if (coupons.length === 0) {
        return <div className="w-full flex justify-center py-4">Không có mã giảm giá nào</div>;
    }


    return (
        <div className='w-full hidden lg:flex lg:flex-wrap items-center gap-4'>
            {latestCoupons.map((coupon, index) => (
                <div key={index} className='flex-1 min-w-[150px]'>
                    <div className='w-[160px] h-[45px] border border-gray-300 rounded-lg flex items-center cursor-pointer' onClick={() => showModal(coupon)}>
                        <div className='w-7 h-8 m-2 bg-yellow-1 flex items-center justify-center rounded-sm'>
                            <div className='w-5 h-5  bg-white rounded-full text-yellow-1'>
                                <PiSealPercentLight className='w-5 h-5' />
                            </div>
                        </div>
                        <div className='w-[110px] p-2 text-caption truncate'>Mã giảm {coupon.value}%</div>
                    </div>
                    <Modal title="Mã Giảm Giá" open={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                        {selectedCoupon && (
                            <div>
                                <div className='mb-2 px-4 py-2 bg-yellow-1 bg-opacity-25 text-yellow-3 rounded-md'>
                                    {/* Mã giảm giá {selectedCoupon.value} Tối đa {formatNumber(selectedCoupon.max_value)} */}
                                    {selectedCoupon.description}
                                </div>
                                {/* <div>- Áp dụng cho đơn hàng có tổng giá trị đơn hàng từ {formatNumber(selectedCoupon.min_total)}</div> */}
                                <div>- Hạn sử dụng đến hết ngày {selectedCoupon.end_date ? new Date(selectedCoupon.end_date).toLocaleDateString() : 'N/A'}</div>
                            </div>

                        )}
                    </Modal>
                </div>
            ))}
        </div>
    );
};

export default ListCoupon;


