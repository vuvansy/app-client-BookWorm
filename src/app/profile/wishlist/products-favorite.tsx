import BoxProduct from "@/components/list-product/box-product";
import React from "react";

const products = [
  {
    id: "1",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12 - Tặng Kèm Set Postcard Polaroid",
    price_old: 50_000,
    price_new: 38_000,
    rating: 4.5,
  },
  {
    id: "2",
    image: "/9786044067162.webp",
    name: "38 Bức Thư Rockefeller Viết Cho Con Trai",
    price_old: 120_000,
    price_new: 92_460,
    rating: 4.5,
  },
  {
    id: "3",
    image: "/9786044067162.webp",
    name: "Mặt Dày Tâm Đen (Tái Bản)",
    price_old: 150_000,
    price_new: 118_300,
    rating: 4.5,
  },
  {
    id: "4",
    image: "/9786044067162.webp",
    name: "Văn Minh Vật Chất Của Người Việt",
    price_old: 300_000,
    price_new: 273_000,
    rating: 4.5,
  },
  {
    id: "5",
    image: "/9786044067162.webp",
    name: "Tuyệt Kỹ Tiếng Anh Thương Mại",
    price_old: 110_000,
    price_new: 91_200,
    rating: 4.5,
  },
  {
    id: "6",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12 - Tặng Kèm Set Postcard Polaroid",
    price_old: 50_000,
    price_new: 38_000,
    rating: 4.5,
  },
  {
    id: "7",
    image: "/9786044067162.webp",
    name: "38 Bức Thư Rockefeller Viết Cho Con Trai",
    price_old: 120_000,
    price_new: 92_460,
    rating: 4.5,
  },
  {
    id: "8",
    image: "/9786044067162.webp",
    name: "Mặt Dày Tâm Đen (Tái Bản)",
    price_old: 150_000,
    price_new: 118_300,
    rating: 4.5,
  },
  {
    id: "9",
    image: "/9786044067162.webp",
    name: "Văn Minh Vật Chất Của Người Việt",
    price_old: 300_000,
    price_new: 273_000,
    rating: 4.5,
  },
  {
    id: "10",
    image: "/9786044067162.webp",
    name: "Tuyệt Kỹ Tiếng Anh Thương Mại",
    price_old: 110_000,
    price_new: 91_200,
    rating: 4.5,
  },
];
export default function ProductFavorite() {
  return (
    <div>
      <div className="bg-white overflow-hidden pb-[10px] flex flex-wrap justify-center items-center">
        <div className="flex justify-between flex-wrap gap-y-[10px] px-[15px] mt-[10px]  mb-[20px]  ">
          {products.map((product) => (
            <BoxProduct key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
