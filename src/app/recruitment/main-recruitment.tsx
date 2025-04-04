import Image from "next/image";

function RecruitmentContent() {
  return (
    <div className="">
      <Image
        src="/tuyendung.png"
        alt="about"
        width={800}
        height={500}
        className="object-cover w-full h-auto rounded"
      />
      <div className="">
      <div className="px-4 py-4">
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            TUYỂN CTV CHĂM SÓC KHÁCH HÀNG
          </h1>
          <p className="text-gray-700">
            <span className="font-semibold">Công ty:</span> CÔNG TY BOOKWORM - TRUNG TÂM THƯƠNG MẠI ĐIỆN TỬ
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Địa điểm làm việc:</span> Lầu 5 - 387-389 Hai Bà Trưng, Quận 3, Thành phố Hồ Chí Minh
          </p>
        </section>
        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Yêu cầu công việc
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Tốt nghiệp từ Cao Đẳng (trở lên)</li>
            <li>Sử dụng thành thạo vi tính văn phòng</li>
            <li>Chủ động, có trách nhiệm với công việc</li>
            <li>Có tính cẩn thận, nhanh nhẹn, ham học hỏi</li>
            <li>
              Thời gian làm việc: Giờ hành chính, từ thứ 2 đến sáng thứ bảy (8h-12h, 13h30-17h)
            </li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Mô tả công việc
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              Nghe điện thoại hỗ trợ khách hàng giải quyết các vấn đề phát sinh
              trong quá trình mua hàng
            </li>
            <li>
              Thực hiện các yêu cầu công việc khác theo sự phân công của cấp trên
            </li>
            <li>Lương thỏa thuận</li>
          </ul>
        </section>

        {/* Yêu cầu hồ sơ */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Yêu cầu hồ sơ
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>CV giới thiệu bản thân, kinh nghiệm</li>
            <li>
              Nộp hồ sơ qua Email:{" "}
              <span className="font-semibold">nga.nguyen@BOOKWORM.com.vn</span>
            </li>
            <li>
              Cú pháp tiêu đề email: Họ tên - Ứng tuyển – CTV chăm sóc khách hàng
            </li>
          </ul>
        </section>
      
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            Tuyển dụng Cộng Tác Viên Content Creator
          </h2>
        </section>
        <section className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Mô tả công việc
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              Sáng tạo ý tưởng, xây dựng nội dung và quay dựng video phù hợp với
              nền tảng TikTok
            </li>
            <li>
              Tiếp nhận thông tin sản phẩm, đảm bảo tính chính xác và chất lượng
              khi xây dựng nội dung video
            </li>
            <li>
              Đảm bảo số lượng video theo tuần/tháng để phát triển kênh đúng định
              hướng
            </li>
            <li>
              Theo dõi mức độ hiệu quả qua lượt follow và lượt view của kênh
            </li>
          </ul>
        </section>
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Yêu cầu công việc
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Am hiểu ngành sách và văn phòng phẩm</li>
            <li>
              Có khả năng nghiên cứu trends, bắt trends nhanh và thích nghi với
              sự thay đổi thuật toán của TikTok
            </li>
            <li>Năng động, tự tin, hoạt ngôn trước ống kính</li>
            <li>Tinh thần học hỏi không giới hạn</li>
            <li>Có kinh nghiệm sản xuất nội dung trên TikTok 6 tháng trở lên</li>
          </ul>
        </section>
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Chính sách đãi ngộ
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Được đào tạo thêm về mảng video</li>
            <li>Được hỗ trợ đầy đủ công cụ chuyên nghiệp từ Công ty</li>
            <li>
              Môi trường làm việc trẻ, năng động, hòa đồng, chia sẻ cùng nhau
              phát triển
            </li>
            <li>
              Nhiều cơ hội học tập, phát triển và ưu tiên phát triển năng lực bản
              thân
            </li>
            <li>Thời gian linh động</li>
          </ul>
        </section>
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Địa điểm và thông tin liên hệ
          </h3>
          <p className="text-gray-700">
            Lầu 5 Nhà sách BOOKWORM Tân Định, 387-389 Hai Bà Trưng, Phường 8, Quận
            3
          </p>
          <p className="text-gray-700">
            Zalo: <span className="font-semibold">0908 387 367</span> (Anh Khang)
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}

export default RecruitmentContent;
