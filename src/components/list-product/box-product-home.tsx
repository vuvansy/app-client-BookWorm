import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const BoxProductHome = (props: IBook) => {
  const { _id, image, name, price_old, price_new } = props;

  const discount =
    price_new && price_new < price_old
      ? Math.round(((price_old - price_new) / price_old) * 100)
      : undefined;

  return (
    <div className="group w-full sm:max-w-[200px] md:max-w-[232px] ">
      <div className="relative bg-white group-hover:shadow-custom  overflow-hidden">
        {discount && (
          <div className="lg:w-[44px] w-[40px] lg:h-[44px] h-[40px] absolute z-10 top-[6px] left-[6px] rounded-full bg-yellow-3 flex justify-center items-center">
            <span className="text-white lg:text-body-bold text-caption-bold">
              -{discount}%
            </span>
          </div>
        )}
        <div className="absolute z-10 top-[6px] right-[6px] opacity-0 transition-all ease-in-out duration-1000 group-hover:opacity-100 flex flex-col gap-[4px]">
          <div className="lg:w-9 w-8 lg:h-9 h-8 shadow-custom bg-white flex justify-center items-center cursor-pointer">
            <BsCartPlus className="text-[22px] text-red1" />
          </div>
          <div className="lg:w-9 w-8 lg:h-9 h-8 shadow-custom bg-white flex justify-center items-center cursor-pointer">
            <MdOutlineFavoriteBorder className="text-[22px] text-red1" />
          </div>
        </div>
        <div className="p-3 flex flex-col justify-center items-center">
          <div className="w-[190px] h-[190px] mb-2">
            <div className="relative">
              <Link href={`/product/${_id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${image}`}
                  alt={name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  className="w-full h-auto object-cover"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-caption h-[40px] mb-2 line-clamp-2">
              <Link href={`/product/${_id}`}>{name}</Link>
            </h2>
            <div className="md:text-body1 text-caption  flex justify-between mb-2">
              <span className="text-price-special font-bold">
                {new Intl.NumberFormat("vi-VN").format(price_new || price_old)}{" "}
                đ
              </span>
              {price_new !== undefined && price_new > 0 && (
                <span className="text-price-old line-through">
                  {new Intl.NumberFormat("vi-VN").format(price_old)} đ
                </span>
              )}
            </div>
          </div>
          <div className="pb-[4px]">
            <button className="xl:px-[25px] px-[30px] py-[5px] flex justify-center items-center gap-x-2 text-red1 lg:text-body-bold text-caption-bold bg-white border border-red1 rounded-lg hover:text-white hover:bg-red1">
              <MdShoppingCart className="text-[22px] hidden md:block" />
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxProductHome;
