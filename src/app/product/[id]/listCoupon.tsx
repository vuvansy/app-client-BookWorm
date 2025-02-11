'use client'
import React, { useState } from 'react';
import { Modal } from 'antd';
import { PiSealPercentLight } from "react-icons/pi";

interface Coupon {
    name: string;
    value: string;
    min: number;
    max: number;
    end_date: string;
}

const coupons = [
    { name: "Mã giảm 12%", value: "12%", min: 129000, max: 30000, end_date: "21/02/2025" },
    { name: "Mã giảm 20%", value: "20%", min: 200000, max: 50000, end_date: "22/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, end_date: "23/02/2025" },
];
const ListCoupon = () => {
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
        <div className='w-full h-[45px] flex items-center gap-x-4'>
            {coupons.map((coupon, index) => (
                <div key={index}>
                    <div className='h-[45px] border border-gray-300 rounded-lg flex items-center cursor-pointer' onClick={() => showModal(coupon)}>
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


