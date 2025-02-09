import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsBox = () => {
  return (
    <Link href="">
      <div className="w-[555px] h-[105px] flex">
        <Image src="/image86.png" alt="" width={148} height={105} />
        <div className="ml-[18px]">
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
