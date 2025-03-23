"use client";
import React from "react";
import { Empty, Spin, Rate, ConfigProvider } from "antd";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useCurrentApp } from "@/context/app.context";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductFavorite = () => {
  const { user } = useCurrentApp();

  const { data, error, isLoading } = useSWR<IBackendRes<IBookLike[]>>(
    user ? `http://localhost:4000/api/v1/book-like/${user.id}` : null,
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spin size="large">
          <span className="text-gray-600">Loading...</span>
        </Spin>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center py-6">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>Không thể tải danh sách yêu thích.</span>}
        />
      </div>
    );

  const favoriteBooks = Array.isArray(data?.data)
    ? data.data.map((item) => item.id_book).filter((book) => book)
    : [];

  if (!favoriteBooks.length)
    return (
      <div className="flex justify-center py-6">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>Bạn chưa có sản phẩm yêu thích nào để hiển thị</span>
          }
        />
      </div>
    );

  return (
    <div className="bg-white overflow-hidden pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 mt-4 mb-6">
        {favoriteBooks.map((book) => {
          const { _id, name, image, price_new, price_old, rating, quantity } =
            book;
          const discount =
            price_new && price_old
              ? Math.round(((price_old - price_new) / price_old) * 100)
              : null;

          return (
            <div
              key={_id}
              className="group w-full sm:max-w-[200px] md:max-w-[232px]"
            >
              <div className="relative bg-white group-hover:shadow-custom overflow-hidden">
                {discount && (
                  <div className="lg:w-[44px] w-[40px] lg:h-[44px] h-[40px] absolute z-10 top-[6px] right-[6px] rounded-full bg-yellow-3 flex justify-center items-center">
                    <span className="text-white lg:text-body-bold text-caption-bold">
                      -{discount}%
                    </span>
                  </div>
                )}
                <div className="p-3 flex flex-col justify-center items-center">
                  <div className="w-[190px] h-[190px] mb-2 overflow-hidden">
                    <div className="relative">
                      <Link href={`/product/${_id}`}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${image}`}
                          alt={name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          className="w-full"
                          priority
                        />
                      </Link>
                      {quantity === 0 && (
                        <div
                          className="absolute top-1/2 left-1/2 w-[150px] bg-red-600 text-white text-md font-bold py-2 text-center shadow-md 
                          rotate-[-25deg] -translate-x-1/2 -translate-y-1/2"
                        >
                          Hết hàng
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <h2 className="text-caption h-[40px] mb-2 line-clamp-2">
                      <Link href={`/product/${_id}`}>{name}</Link>
                    </h2>
                    <div className="text-body1 leading-5 flex justify-between mb-2">
                      <span className="text-price-special font-bold">
                        {new Intl.NumberFormat("vi-VN").format(
                          price_new || price_old
                        )}{" "}
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
                      {rating && rating > 0 ? (
                        <Rate disabled allowHalf value={rating} />
                      ) : (
                        <span className="text-gray-500 text-info">
                          Chưa có đánh giá
                        </span>
                      )}
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFavorite;
