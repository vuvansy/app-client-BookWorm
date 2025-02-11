import Image from "next/image";
import Link from "next/link";

function SidebarAbout() {
    const posts = [
        {
          id: 1,
          image: "/post1.webp",
          title:
            "Bản tiếng Việt cuốn sách mới của Yuval Noah Harari sắp ra mắt độc giả Việt Nam “NEXUS: A Brief History of Information Networks from the Stone Age to AI",
          description:
            "Ấn bản tiếng Việt của cuốn sách “NEXUS: A Brief History of Information Networks from the Stone Age to AI” của tác giả Yuval Noah Harari sẽ chính thức ra mắt vào cuối tháng 9/2024 tới đây, được ấn hành bởi Omega Plus Books.",
          date: "07/02/2023",
        },
        {
          id: 2,
          image: "/post7.png",
          title: "Top 100 cuốn sách kỹ năng hay nhất",
          description:
            "Tuổi trẻ là khám phá và học hỏi. Tuổi trẻ là theo đuổi ước mơ và khát khao chiến thắng. Để có được một tuổi trẻ đáng nhớ và ý nghĩa, bạn không thể ngừng phát triển bản thân ở mọi mặt của cuộc sống. Với danh sách 100 cuốn sách kỹ năng hay nhất của BookWorm chia thành 9 loại kỹ năng thiết yếu dành cho bạn trẻ, chúng tôi mong muốn giúp cho những độc giả trẻ tuổi, năng động và bận rộn tiếp cận được những cuốn sách hữu ích và cần thiết nhất cho cuộc sống. 100 cuốn sách - 100 kỹ năng sống, học tập và làm việc - sẽ là hành trang của bạn trên đường đời sau này. Chúc các bạn thành công!",
          date: "22/04/2023",
        },
        {
          id: 3,
    
          image: "/post3.jpeg",
          title:
            "Review sách: Nền Giáo Dục Của Người Giàu - Những Bài Học Để Thành Công Chỉ Trường Đời Mới Dạy",
          description:
            "“Thiết Kế Game Nâng Cao: Phương Pháp Tư Duy Hệ Thống” của tác giả Michael Sellers là cuốn sách thiết kế game mới nhất dành cho những nhà Thiết kế Game mong muốn bước chân vào con đường Thiết kế game chuyên nghiệp. ",
          date: "07/03/2023",
        },
        {
          id: 4,
    
          image: "/post4.jpeg",
          title:
            "Thiết Kế Game Nâng Cao – Nâng Nghệ Thuật Thiết Kế Game Lên Tầm Cao Mới",
          description:
            "Sách “Chuyển đổi số - năm giai đoạn triển khai công nghệ số cho doanh nghiệp” của Lindsay Herbert nêu định nghĩa và các bước đi cụ thể của hành trình chuyển đổi số",
          date: "01/02/2023",
        },
        {
          id: 5,
    
          image: "/post5.jpeg",
          title: "Hành trình vươn tầm tri thức",
          description:
            "Được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh nghiệm quản trị của các chuyên gia",
          date: "07/02/2013",
        },
      ];
    return ( 
      
        <div className="w-[30%] pl-[10px] sticky top-0 self-start">
          <h2 className="text-body1">Bài viết khác</h2>
          <ul>
            {posts.map((item) => (
              <li
                key={item.id}
                className="flex space-x-[15px] min-h-[103px] py-[10px] border-b-[1px] border-[#EBEBEB]"
              >
                <div className="relative w-[155px] h-[115px]  ">
                  <Link href={""}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={155}
                      height={0}
                      className="rounded object-cover h-auto"
                    />
                  </Link>
                </div>
                <div className="flex w-[180px] flex-col ">
                  <Link href={""}>
                    <h3 className=" text-info-bold line-clamp-3">
                      {item.title}
                    </h3>
                  </Link>
                  <span className="text-info text-[#333333]">{item.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
     );
}

export default SidebarAbout;