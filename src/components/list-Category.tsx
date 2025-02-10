import React from "react";
import { BiCategory } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

const cate = [
  {
    id: 1,
    name: "Sách y học",
    image: "/image74.jpg",
  },
  {
    id: 2,
    name: "Sách lịch sử",
    image: "/image.png",
  },
  {
    id: 3,
    name: "Sách văn hóa",
    image: "/image1.png",
  },
  {
    id: 4,
    name: "Sách văn học",
    image: "/image2.png",
  },
  {
    id: 5,
    name: "Sách tâm lý kỹ năng",
    image: "/image3.png",
  },
  {
    id: 6,
    name: "Sách thiếu nhi",
    image: "/image4.png",
  },
  {
    id: 7,
    name: "Sách học ngoại ngữ",
    image: "/image5.png",
  },
  {
    id: 8,
    name: "Ngoại văn",
    image: "/image7.png",
  },
];
const CategoryPage = () => {
  return (
    <div className="bg-white container mt-6 rounded-[10px]">
      <div className="container h-[64px] p-4 flex items-center rounded-t-[10px]">
        <BiCategory className="text-[red] w-[30px] h-[30px] mr-[10px] " />
        <div className="text-sub-heading-bold">Danh mục sản phẩm</div>
      </div>
      <div className="flex  container rounded-b-[10px] flex-row justify-between p-4">
        {cate.map((item) => (
          <Link href="" key={item.id}>
            <div className="text-center w-[120px] flex flex-col items-center hover:text-[#C92127] cursor-pointer">
              <Image
                className="mb-4"
                src={item.image}
                alt=""
                width={100}
                height={100}
              />
              <p className="text-body1 capitalize">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
