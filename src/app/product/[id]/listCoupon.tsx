'use client'
import React, { useState } from 'react';
import { Modal } from 'antd';
import { PiSealPercentLight } from "react-icons/pi";

interface Coupon {
    name: string;
    value: string;
    min: number;
    max: number;
    create_date: string;
    end_date: string;
}

const coupons = [
    { name: "Mã giảm 12%", value: "12%", min: 129000, max: 30000, create_date: "01/01/2025", end_date: "21/02/2025" },
    { name: "Mã giảm 20%", value: "20%", min: 200000, max: 50000, create_date: "02/01/2025", end_date: "22/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "03/01/2025", end_date: "23/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "04/01/2025", end_date: "23/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "05/01/2025", end_date: "23/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "06/01/2025", end_date: "23/02/2025" },

];
const ListCoupon = () => {
    const getLatestCoupons = (coupons: Coupon[]): Coupon[] => {
        return coupons
            .sort((a, b) => new Date(b.create_date).getTime() - new Date(a.create_date).getTime())
            .slice(0, 4);
    };
    const latestCoupons = getLatestCoupons(coupons);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const showModal = (coupon: Coupon) => {
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
                        <div className='w-[110px] p-2 text-caption truncate'>{coupon.name}</div>
                    </div>
                    <Modal title="Mã Giảm Giá" open={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                        {selectedCoupon && (
                            <div>
                                <div className='mb-2 px-4 py-2 bg-yellow-1 bg-opacity-25 text-yellow-3 rounded-md'>
                                    Mã giảm giá {selectedCoupon.value} Tối đa {formatNumber(selectedCoupon.max)}
                                </div>
                                <div>- Áp dụng cho đơn hàng có tổng giá trị đơn hàng từ {formatNumber(selectedCoupon.min)}</div>
                                <div>- Hạn sử dụng đến hết ngày {selectedCoupon.end_date} </div>
                            </div>

                        )}
                    </Modal>
                </div>
            ))}
        </div>
    );
};

export default ListCoupon;


