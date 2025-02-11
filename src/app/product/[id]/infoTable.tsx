import React from "react";

const ProductInfo = () => {
    const productInfo = [
        { label: "Mã hàng", value: "8935086856000" },
        { label: "Tên Nhà Cung Cấp", value: "FIRST NEWS" },
        { label: "Tác giả", value: "J Krishnamurti" },
        { label: "Người Dịch", value: "Huỳnh Hiếu Thuận" },
        { label: "NXB", value: "Hồng Đức" },
        { label: "Năm XB", value: "2022" },
        { label: "Trọng lượng (gr)", value: "339" },
        { label: "Kích Thước Bao Bì", value: "20.5 x 14.5 x 1.4" },
        { label: "Số trang", value: "304" },
        { label: "Hình thức", value: "Bìa Mềm" },
    ];

    return (
        <div className="w-full">
            <div className="divide-y divide-bg-main">
                {productInfo.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 py-2">
                        <span className="text-price-old text-caption">{item.label}</span>
                        <span className="text-bg-text text-caption">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductInfo;

