import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";

interface IProduct {
  id: string;
  image: string;
  name: string;
  priceNew?: number;
  priceOld: number;
}

const BoxProductHome = (props: IProduct) => {
  const { id, image, name, priceOld, priceNew } = props;

  const discount =
    priceNew && priceNew < priceOld
      ? Math.round(((priceOld - priceNew) / priceOld) * 100)
      : undefined;

  return (
    <div className="group">
      <div className="w-[232px] relative bg-white group-hover:shadow-custom">
        {discount && (
          <div className="w-[44px] h-[44px] absolute z-10 top-[6px] left-[6px] rounded-full bg-yellow-3 flex justify-center items-center">
            <span className="text-white text-body-bold">-{discount}%</span>
          </div>
        )}
        <div className="absolute z-10 top-[6px] right-[6px] opacity-0 transition-all ease-in-out duration-1000 group-hover:opacity-100 flex flex-col gap-[4px]">
          <div className="w-9 h-9 shadow-custom bg-white flex justify-center items-center cursor-pointer">
            <BsCartPlus className="text-[22px] text-red1" />
          </div>
          <div className="w-9 h-9 shadow-custom bg-white flex justify-center items-center cursor-pointer">
            <MdOutlineFavoriteBorder className="text-[22px] text-red1" />
          </div>
        </div>
        <div className="p-3 flex flex-col justify-center items-center">
          <div className="w-[190px] h-[190px] mb-2">
            <div className="relative">
              <Link href={`/product/${id}`}>
                <Image
                  src={image}
                  alt={name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  className="w-full"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-caption h-[40px] mb-2 line-clamp-2">
              <Link href={`/product/${id}`}>{name}</Link>
            </h2>
            <div className="text-body1 leading-5 flex justify-between mb-2">
              <span className="text-price-special font-bold">
                {(priceNew || priceOld).toLocaleString()} đ
              </span>
              {priceNew && (
                <span className="text-price-old line-through">
                  {priceOld.toLocaleString()} đ
                </span>
              )}
            </div>
          </div>
          <div className="pb-[4px]">
            <button className="h-[36px] w-[200px] flex justify-center items-center gap-x-2 text-red1 text-body-bold bg-white border border-red1 rounded-lg hover:text-white hover:bg-red1">
              <MdShoppingCart className="text-[22px]" />
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxProductHome;
