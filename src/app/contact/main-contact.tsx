import { CiLocationOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { MdOutlineQuestionMark } from "react-icons/md";

export default function Contact() {
  return (
    <div className="bg-white rounded-lg">
      <h1 className="text-[29px] pt-5 pl-5 ">Liên Hệ</h1>
      <div className="grid grid-cols-1 gap-6 px-5 py-5">
        {/* Phần bản đồ */}
        <div className="w-full h-[450px] ">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.647837782239!2d106.62367081505052!3d10.85362386135594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e1!3m2!1svi!2sus!4v1743652782957!5m2!1svi!2sus"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-bg-main rounded-lg p-4 flex items-start">
            <div className="w-12 h-12 bg-red1  rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-[20px]"><CiLocationOn /></span>
            </div>
            {/* Nội dung */}
            <div className="">
              <h3 className="font-semibold mb-1">Địa chỉ</h3>
              <p className="text-gray-700">
              Tân Chánh Hiệp, Quận 12, Hồ Chí Minh
              </p>
            </div>
          </div>
          <div className="bg-bg-main rounded-lg p-4 flex items-start">
            <div className="w-12 h-12 bg-red1  rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-[20px]"><MdOutlineQuestionMark /></span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Gửi thắc mắc</h3>
              <p className="text-gray-700">nick.BookWorm@gmail.com</p>
            </div>
          </div>
          <div className="bg-bg-main rounded-lg p-4 flex items-start">
            <div className="w-12 h-12 bg-red1  rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-[20px]"><FaPhone /></span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Điện thoại</h3>
              <p className="text-gray-700">0932 329 999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
