import BoxProduct from "../box-product";

const products = [
  {
    id: "1",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12 - Tặng Kèm Set Postcard Polaroid",
    priceOld: 50_000,
    priceNew: 38_000,
  },
  {
    id: "2",
    image: "/9786044067162.webp",
    name: "38 Bức Thư Rockefeller Viết Cho Con Trai",
    priceOld: 120_000,
    priceNew: 92_460,
  },
  {
    id: "3",
    image: "/9786044067162.webp",
    name: "Mặt Dày Tâm Đen (Tái Bản)",
    priceOld: 150_000,
    priceNew: 118_300,
  },
  {
    id: "4",
    image: "/9786044067162.webp",
    name: "Văn Minh Vật Chất Của Người Việt",
    priceOld: 300_000,
    priceNew: 273_000,
  },
  {
    id: "5",
    image: "/9786044067162.webp",
    name: "Tuyệt Kỹ Tiếng Anh Thương Mại",
    priceOld: 110_000,
    priceNew: 91_200,
  },
  {
    id: "1",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12 - Tặng Kèm Set Postcard Polaroid",
    priceOld: 50_000,
    priceNew: 38_000,
  },
  {
    id: "2",
    image: "/9786044067162.webp",
    name: "38 Bức Thư Rockefeller Viết Cho Con Trai",
    priceOld: 120_000,
    priceNew: 92_460,
  },
  {
    id: "3",
    image: "/9786044067162.webp",
    name: "Mặt Dày Tâm Đen (Tái Bản)",
    priceOld: 150_000,
    priceNew: 118_300,
  },
  {
    id: "4",
    image: "/9786044067162.webp",
    name: "Văn Minh Vật Chất Của Người Việt",
    priceOld: 300_000,
    priceNew: 273_000,
  },
  {
    id: "5",
    image: "/9786044067162.webp",
    name: "Tuyệt Kỹ Tiếng Anh Thương Mại",
    priceOld: 110_000,
    priceNew: 91_200,
  },
];

const ListProduct = () => {
  return (
    <div className="bg-white overflow-hidden pb-[10px] flex flex-wrap justify-center items-center">
      <div className="flex justify-between flex-wrap gap-y-5 px-[15px] mt-[10px]  mb-[20px]  ">
        {products.map((product) => (
          <BoxProduct key={product.id} {...product} />
        ))}
      </div>
      <div className="m-20px mb-4">
        <button className="h-[36px] w-[200px] flex justify-center items-center gap-x-2 text-red1 text-body-bold bg-white border border-red1 rounded-lg hover:text-white hover:bg-red1">
          <span>Xem thêm</span>
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
