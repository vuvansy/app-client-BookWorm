import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";

import {
  FaFacebook,
  FaPhoneAlt,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const AppFooter = () => {
  return (
    <footer className="pt-[30px] bg-bg-main ">
      <div className=" container bg-white flex flex-col lg:flex-row pt-[16px] rounded-lg">
        <div className="relative basis-2/6 text-info ">
          <div className=" w-full h-[69px] mb-[8px] py-2.5 px-[15px] ">
            <Link href={"/"}>
              <div className="relative w-[270px] h-[50px] ">
            <Image
                  src={"/icon/logo.png"}
                  alt="logo BookWorm"
                  fill
                  priority
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>
          </div>
          <div className="ml-[10px] mt-[10px] ">
            <p className="pr-[15px] pl-[10px]">
              Lầu 3, 387-389 Hai Bà Trưng, Quận 3, TP. HCM <br />
              Công Ty Cổ Phần Phát Hành Sách TP HCM - BookWorm <br />
              60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
            </p>
            <p className="pt-[5px] pr-[15px] pl-[10px]">
            BookWorm nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống  BookWorm trên toàn quốc.
            </p>
            <div className="flex mt-[20px] pl-[10px] pb-[15px] md:mt-[10px] ">
              <Link className="pr-[10px]" href={"https://www.pinterest.com/vovankhang184/_profile/"}>
                <FaPinterest className="w-[25px] h-[25px]" />
              </Link>
              <Link className="pr-[10px]" href={"https://x.com/VoFpl95717"}>
                <FaTwitter className="w-[25px] h-[25px]" />
              </Link>
              <Link className="pr-[10px]" href={"https://www.youtube.com/@khangvovan6195/community"}>
                <FaYoutube className="w-[25px] h-[25px]" />
              </Link> 
              <Link className="pr-[10px]" href={"https://www.facebook.com/zankhng"}>
                <FaFacebook className="w-[25px] h-[25px]" />
              </Link>
              <Link className="pr-[10px]" href={"https://www.instagram.com/vankhng11/"}>
                <AiFillInstagram className="w-[25px] h-[25px]" />
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-[95%] border-r border-[#cecece]"></div>
        </div>
        <div className="basis-4/6 ml-[20px] mt-[10px] md:mt-0 md:ml-[10px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            <div className="max-w-[350px] w-full px-[10px] mb-[10px] ">
              <h3 className="text-body-bold  ">DỊCH VỤ</h3>
              <ul className="text-info  mt-[10px] space-y-[5px] md:space-y-[10px] ">
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Điều khoản sử dụng
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Chính sách bảo mật thông tin
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Chính sách bảo mật thanh toán
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696] "
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem]  group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Giới thiệu BookWorm
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Hệ thống trung tâm - nhà sách
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="max-w-[350px] w-full px-[10px] mb-[10px]">
              <h3 className="text-body-bold ">HỖ TRỢ</h3>
              <ul className="text-info  mt-[10px] space-y-[5px] md:space-y-[10px]">
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Chính sách đổi - trả - hoàn tiền
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Chính sách bảo hành - bồi hoàn
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Chính sách vận chuyển
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Chính sách khách sỉ
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="max-w-[350px] w-full px-[10px] mb-[10px]">
              <h3 className="text-body-bold ">TÀI KHOẢN CỦA TÔI</h3>
              <ul className="text-info  mt-[10px] space-y-[5px] md:space-y-[10px]">
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Đăng nhập/Tạo mới tài khoản
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Thay đổi địa chỉ khách hàng
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Chi tiết tài khoản
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group flex items-center space-x-2 hover:text-[#ea7696]"
                  >
                    <span className="h-0.5 w-4 bg-[#ea7696] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-1000 ease-in-out"></span>
                    <span className="inline-block transform translate-x-[-1.5rem] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out text-base md:text-xl lg:text-2xl">
                      Lịch sử mua hàng
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-[15px] pl-[10px] pb-[15px]">
            <h3 className="text-body-bold">LIÊN HỆ</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-[10px] text-info pl-0 md:pl-[15px] ">
              <div className="flex items-center ">
                <FaLocationDot className="mr-2" />
                <p>60-62 Lê Lợi Q1, TP.HCM</p>
              </div>
              <div className="flex items-center ">
                <MdEmail className="mr-2" /> <p>cshk@bookworm.com.vn</p>
              </div>
              <div className="flex items-center ">
                <FaPhoneAlt className="mr-2" />
                <p> 190000000000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
