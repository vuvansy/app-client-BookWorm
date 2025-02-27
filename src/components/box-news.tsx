import Image from "next/image";
import Link from "next/link";
import React from "react";
//20240424_RFXcJbDd.jpeg
//20240108_m2KOIfYJ.jpeg
//20200115_AWqbYWkySz5ItGrwoLvHZfzR.jpeg
//20240416_arOL3oEX.jpeg

const promotions = [
  {
    id: 1,
    image: "/20200509_h00usscv12jslgSaeESa0ZNg.png",
    title: " Nền Giáo Dục Của Người Giàu ",
    description:
      "Cuốn sách không đưa bạn theo lối mòn, ru ngủ bạn với những điều mọi người trước nay vẫn nói với bạn: Học hành trong trường lớp là con đường duy nhất",
    link: "/khuyen-mai/noel",
  },
  {
    id: 2,
    image: "/20240108_m2KOIfYJ.jpeg",
    title: "Hành trình vươn tầm tri thức",
    description:
      "Được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư…",
    link: "/khuyen-mai/flash-sale",
  },
  {
    id: 3,
    image: "/20200115_AWqbYWkySz5ItGrwoLvHZfzR.jpg",
    title: "NHỮNG THÁCH THỨC CỦA NHÀ LÃNH ĐẠO",
    description:
      "Những thách thức của nhà lãnh đạo” của hai tác giả James M. Kouzes và Barry Z.  ",
    link: "/khuyen-mai/mua-1-tang-1",
  },
  {
    id: 4,
    image: "/20200807_4uHdOuWVgJRqVAjFZY32SGlk.jpg",
    title: "6 Cuốn Sách Sẽ Thay Đổi Tư Duy",
    description:
      "Không phải kim cương hay đá quý, tư duy mới là thứ đắt đỏ nhất. Những ai sở hữu một tư duy logic sắc bén, người đó sẽ có cơ hội trở nên giàu có và thành công cao hơn những người khác. ",
    link: "/khuyen-mai/deal-hot",
  },
];
const NewsBox = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {promotions.map((item) => (
        <Link key={item.id} href={item.link}>
          <div className="w-full h-[105px] flex gap-x-[16px] border cursor-pointer hover:bg-gray-100 transition">
            <Image
              src={item.image}
              alt={item.title}
              width={160}
              height={105}
              className="object-cover"
            />
            <div>
              <p className="text-sub-heading-bold">{item.title}</p>
              <p className="text-caption">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsBox;
