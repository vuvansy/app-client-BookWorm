import Image from "next/image";
import Link from "next/link";

function MainContent() {
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
            "Cuốn sách không đưa bạn theo lối mòn, ru ngủ bạn với những điều mọi người trước nay vẫn nói với bạn: Học hành trong trường lớp là con đường duy nhất. Đương nhiên, bạn có thể học được rất nhiều điều thú vị từ trường đại học, nhưng thực tế",
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
       <div>
         {posts.map((item) => (
              <div className="flex py-[15px] border-b-[1px] border-[#EBEBEB]">
              <div className="w-[300px] h-[202px] relative">
                <Link href={''}> <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="rounded" /></Link>
              </div>
              <div className="w-[580px] h-[202px] pl-[20px]">
              <Link href={''}><h3 className="text-[18px] font-semibold">{item.title}</h3></Link>
                <p className=" text-info mt-2">{item.date}</p>
                <Link href={''}><p className=" text-caption">{item.description}</p></Link>
              </div>
            </div>
        ))}
       </div>
       
     );
}

export default MainContent;