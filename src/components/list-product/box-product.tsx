import Image from "next/image";
import Link from "next/link";
import { ConfigProvider, Rate } from "antd";

interface IProduct {
  id: string;
  image: string;
  name: string;
  priceNew?: number;
  priceOld: number;
  rating: number;
}

const BoxProduct = (props: IProduct) => {
  const { id, image, name, priceOld, priceNew, rating } = props;

  const discount =
    priceNew && priceNew < priceOld
      ? Math.round(((priceOld - priceNew) / priceOld) * 100)
      : undefined;

  return (
    <div className="group">
      <div className="w-[220px] relative bg-white border group-hover:shadow-custom">
        {discount && (
          <div className="w-[44px] h-[44px] absolute z-10 top-[6px] right-[6px] rounded-full bg-yellow-3 flex justify-center items-center">
            <span className="text-white text-body-bold">-{discount}%</span>
          </div>
        )}
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
            <ConfigProvider
              theme={{
                components: {
                  Rate: {
                    starSize: 14,
                  },
                },
              }}
            >
              {rating > 0 ? (
                <Rate disabled allowHalf defaultValue={rating} />
              ) : (
                <span className="text-gray-500 text-info">Chưa có đánh giá</span>
              )}
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxProduct;
