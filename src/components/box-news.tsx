import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsBox = () => {
  return (
    <Link href="">
      <div className="w-[585px] h-[105px] flex gap-x-[16px]">
        <Image
          src="/17358177826395276_512.webp"
          alt=""
          width={160}
          height={105}
          className="object-cover"
        />
        <div className="">
          <p className="text-sub-heading-bold">
            Noel Siêu Sale upto 50%++ Ngàn Quà Tặng
          </p>
          <p className="text-caption">
            Giáng Sinh gõ cửa, tặng ngàn Quà Miễn phí + Top phụ kiện tiêu dùng
            Giảm sâu tới 50% siêu hời không thể bỏ lỡ! ...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsBox;
