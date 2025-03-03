import BoxProductHome from "./box-product-home";

const products = [
  {
    id: "1",
    image: `1740234741250-308788389.jpg`,
    name: "Nhóc Maruko - Tập 12 - Tặng Kèm Set Postcard Polaroid",
    price_old: 50_000,
    price_new: 38_000,
  },
  {
    id: "2",
    image: `1740234741250-308788389.jpg`,
    name: "38 Bức Thư Rockefeller Viết Cho Con Trai",
    price_old: 120_000,
    price_new: 92_460,
  },
  {
    id: "3",
    image: `1740234741250-308788389.jpg`,
    name: "Mặt Dày Tâm Đen (Tái Bản)",
    price_old: 150_000,
    price_new: 118_300,
  },
  {
    id: "4",
    image: `1740234741250-308788389.jpg`,
    name: "Văn Minh Vật Chất Của Người Việt",
    price_old: 300_000,
    price_new: 273_000,
  },
  {
    id: "5",
    image: `1740234741250-308788389.jpg`,
    name: "Tuyệt Kỹ Tiếng Anh Thương Mại",
    price_old: 110_000,
    price_new: 91_200,
  },
  {
    id: "6",
    image: `1740234741250-308788389.jpg`,
    name: "Nhóc Maruko - Tập 12 - Tặng Kèm Set Postcard Polaroid",
    price_old: 50_000,
    price_new: 38_000,
  },
  {
    id: "7",
    image: `1740234741250-308788389.jpg`,
    name: "38 Bức Thư Rockefeller Viết Cho Con Trai",
    price_old: 120_000,
    price_new: 92_460,
  },
  {
    id: "8",
    image: `1740234741250-308788389.jpg`,
    name: "Mặt Dày Tâm Đen (Tái Bản)",
    price_old: 150_000,
    price_new: 118_300,
  },
  {
    id: "9",
    image: `1740234741250-308788389.jpg`,
    name: "Văn Minh Vật Chất Của Người Việt",
    price_old: 300_000,
    price_new: 273_000,
  },
  {
    id: "10",
    image: `1740234741250-308788389.jpg`,
    name: "Tuyệt Kỹ Tiếng Anh Thương Mại",
    price_old: 110_000,
    price_new: 91_200,
  },
];

const ListProductHome = () => {
  return (
    <div className="bg-white overflow-hidden pb-[10px] flex flex-wrap justify-center items-center">
      <div className="flex justify-between flex-wrap gap-y-[10px] px-[15px] mt-[10px]  mb-[20px]  ">
        {products.map((product) => (
          <BoxProductHome key={product.id} {...product} />
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

export default ListProductHome;
