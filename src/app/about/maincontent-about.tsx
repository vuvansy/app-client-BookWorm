import Image from "next/image";

function MaincontentAbout() {
  return (
    <div className="">
      <h1 className="text-heading3-bold text-[#333333]">Về chúng tôi</h1>
      <p className="text-info text-[#888888]">29/11/2019</p>
      <div className="pt-[15px]">
        <h2 className="flex justify-center text-red-600 font-bold text-lg mt-4">
          BOOKWORM - HÀNH TRÌNH VƯƠN TẦM TRI THỨC
        </h2>
        <p className="flex justify-center pt-[10px] tex-body1 italic text-[#616161]">
          Better Knowledge, Better Success
        </p>
      </div>
      <div>
        <p className="pt-4 leading-5 text-[16px]">
          BookWorm được biết đến là một trong những thương hiệu hàng đầu về dòng
          sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với
          các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh
          nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế
          giới. Sau 18 năm hình thành và phát triển, BookWorm đã từng bước khẳng
          định tên tuổi của mình, đặc biệt đối với các thế hệ doanh nhân, nhà
          quản lý và những người trẻ luôn khát khao xây dựng sự nghiệp thành
          công.
        </p>
        <p className="pt-4 leading-5 text-[16px]">
          18 năm, từ một công ty nhỏ thành lập bởi một nhóm tri thức trẻ Hà Nội,
          BookWorm hiện đã phát triển mở rộng thương hiệu chính là BookWorm-
          dòng sách quản trị kinh doanh & kỹ năng và với 5 thương hiệu con:
          Omega Plus - dòng sách tinh hoa về văn hóa, lịch sử; ETS - dòng sách
          về khoa học; Gamma - dòng sách ngoại ngữ; Sống - dòng sách tác giả
          Việt; Medinsight - dòng sách y học.
        </p>
        <p className="pt-4 leading-5 text-[16px]">
          Bên cạnh việc sở hữu hơn 4.000 đầu sách cùng 15.000.000 bản in,
          BookWorm còn thành công tiếp cận độc giả với các cuốn sách nổi bật in
          đậm dấu ấn trong tâm trí người đọc, điển hình như: HBR Onpoint, Quốc
          gia khởi nghiệp, Trí tuệ Do Thái, Phi lý trí, Tư duy nhanh và chậm,
          Tiểu sử Steve Jobs, Thiên nga đen, Chiến lược đại dương xanh, Phù thủy
          sàn chứng khoán,..
        </p>
        <p className="pt-4 leading-5 text-[16px]">
          Tiếp nối thành công, với mong muốn xây dựng một thế hệ các nhà lãnh
          đạo và quản lý mới có năng lực lãnh đạo, tầm nhìn chiến lược và khả
          năng giải quyết vấn đề sáng tạo, BookWorm đã ra mắt dòng sách cao cấp
          Harvard Business Review tại Việt Nam với thiết kế hiện đại, đa dạng
          chủ đề, bắt kịp tư duy kinh doanh của thời đại nhằm đưa ra những giải
          pháp triệt để và kiến thức quản trị nâng cao giúp nhà lãnh đạo - quản
          lý đối phó với biến động của nền kinh tế toàn cầu.
        </p>
        <p className="pt-4 leading-5 text-[16px]">
          Harvard Business Review (HBR) thuộc top đầu sách Quản trị Kinh doanh
          trên khắp thế giới, đã và đang đồng hành cùng với nhiều doanh nghiệp,
          doanh nhân và người lao động Việt Nam. Kể từ khi xuất bản ấn phẩm đầu
          tiên năm 1922 tại Mỹ, HBR luôn mang tới những kỹ năng và kiến thức
          được đúc kết thực tế từ góc nhìn mới mẻ và đầy sức thuyết phục của các
          chuyên gia uy tín hàng đầu giúp con đường sự nghiệp của mỗi cá nhân
          được thăng hoa hơn, cung cấp nhiều giải pháp hữu ích cho mỗi doanh
          nghiệp.
        </p>
        <p className="pt-4 leading-5 text-[16px]">
          BookWorm kỳ vọng những tri thức quản trị tinh tuyển và cập nhật sẽ
          đóng góp vào tư duy quản trị của các doanh nghiệp Việt Nam, khai phóng
          tiềm năng lãnh đạo của mỗi doanh nhân và góp phần vào sự phát triển
          kinh tế chung của quốc gia.
        </p>
        <p className="pt-4 leading-5 text-[16px]">
          Bộ ấn phẩm Harvard Business Review (HBR) danh tiếng toàn cầu được
          BookWorm  &ldquo;bản địa hoá&rdquo; thành công và ra mắt tại Việt Nam với những bộ
          sách chất lượng hàng đầu, nhận được rất nhiều sự yêu thích và đón chờ
          từ độc giả, đặc biệt bởi Shark Nguyễn Thanh Việt, Bà Nguyễn Phương
          Thảo Tổng Giám đốc Vietjet Air, Bà Hà Thu Thanh Chủ tịch Deloitte Việt
          Nam, Ông Hồ Quang Minh Chủ tịch BNI Việt Nam….
        </p>
      </div>
      <div className="pt-4">
  <Image
    src="/about1.webp"
    alt="about"
    width={800}
    height={500}
    className="object-cover w-full h-auto rounded"
  />
</div>

    </div>
  );
}

export default MaincontentAbout;
