import Image from "next/image";
import Link from "next/link";
import { ConfigProvider, Rate } from "antd";



const BoxProduct = (props: IBook) => {
  const { id, image, name, price_new, price_old, rating=0 } = props;


  const discount =
    price_new && price_new < price_old
      ? Math.round(((price_old - price_new) / price_old) * 100)
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
                   src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${image}`}
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
              {new Intl.NumberFormat("vi-VN").format(price_new || price_old)}{" "}
              đ
              </span>
              {price_new && (
                <span className="text-price-old line-through">
                  {new Intl.NumberFormat("vi-VN").format(price_old)} đ
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
