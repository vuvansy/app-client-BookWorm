import React from "react";
import { BiCategory } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

interface Props {
  genre?: IGenre[];
}

const ListCategoryHome = ({ genre }: Props) => {
  return (
    <div className="bg-white container mb-6 rounded-[10px] hidden md:block">
      <div className="container h-[64px] p-4 flex items-center rounded-t-[10px]">
        <BiCategory className="text-[red] w-[30px] h-[30px] mr-[10px]" />
        <div className="text-sub-heading-bold">Danh mục sản phẩm</div>
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 
                   gap-4 p-4"
      >
        {genre?.map((item) => (
          <Link href={`/product/category/${item._id}`} key={item._id}>
            <div className="text-center flex flex-col items-center hover:text-[#C92127] cursor-pointer">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mb-4">
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/genre/${item.image}`}
                    alt={item.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
              <p className="text-body1 capitalize">
                {item.name.replace(/-/g, " ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListCategoryHome;
