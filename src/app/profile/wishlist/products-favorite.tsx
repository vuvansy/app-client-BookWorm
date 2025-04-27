"use client";
import React, { useState, useEffect } from "react";
import { Empty, Spin, Rate, ConfigProvider, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { BsCartPlus } from "react-icons/bs";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { sendRequest } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import Swal from "sweetalert2";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductFavorite = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [favoriteList, setFavoriteList] = useState<IBookLike[]>([]);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const { data, error, isLoading } = useSWR(
    user ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like/${user.id}` : null,
    fetcher
  );

  useEffect(() => {
    if (data?.data) {
      setFavoriteList(data.data);
    }
  }, [data]);
  useEffect(() => {
    const fetchRatings = async () => {
      if (!favoriteList.length) return;
      const ratingsData: { [key: string]: number } = {};
      await Promise.all(
        favoriteList.map(async (item) => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/review/book/${item.id_book._id}`
            );
            const data = await res.json();
            if (data?.data?.length) {
              const avgRating =
                data.data.reduce(
                  (sum: number, review: { rating: number }) =>
                    sum + review.rating,
                  0
                ) / data.data.length;
              ratingsData[item.id_book._id] = avgRating;
            } else {
              ratingsData[item.id_book._id] = 0;
            }
          } catch (error) {
            console.error(
              `Lỗi lấy đánh giá cho sách ${item.id_book._id}:`,
              error
            );
          }
        })
      );

      setRatings(ratingsData);
    };

    fetchRatings();
  }, [favoriteList]);
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

  const favoriteBooks = favoriteList
    .map((item) => item.id_book)
    .filter(Boolean);

  if (!favoriteBooks.length)
    return (
      <div className="flex justify-center py-6">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>Bạn chưa có sản phẩm yêu thích nào.</span>}
        />
      </div>
    );

  const handleAddToCart = (currentBook: IBook) => {
    const maxQuantity = currentBook.quantity || 0;
    const currentCartQuantity =
      cart.items.find((item) => item._id === currentBook._id)?.quantity || 0;

    if (currentCartQuantity + 1 > maxQuantity) {
      notification.warning({
        message: "Lỗi Số Lượng",
        description: `Số lượng yêu cầu (${currentCartQuantity + 1
          }) không có sẵn.`,
      });
      return;
    }

    dispatch(addToCart({ item: currentBook, quantity: 1 }));
    Swal.fire({
      icon: "success",
      title: "Sản phẩm đã thêm vào giỏ hàng!",
      showConfirmButton: false,
      timer: 2000,
      background: "rgba(0, 0, 0, 0.7)",
      color: "#ffffff",
    });
  };

  const handleToggleFavorite = async (bookId: string) => {
    if (!user) {
      notification.warning({
        message: "Thông báo",
        description: "Bạn cần đăng nhập để thích sản phẩm!",
      });
      return;
    }

    const bookLikeItem = favoriteList.find(
      (item) => item.id_book._id === bookId
    );
    const bookLikeId = bookLikeItem?._id;

    try {
      if (bookLikeId) {
        await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like/${bookLikeId}`,
          method: "DELETE",
        });
        notification.success({ message: "Đã Bỏ Yêu Thích!" });
      } else {
        await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like`,
          method: "POST",
          body: { id_user: user.id, id_book: bookId },
        });
        notification.success({ message: "Đã Thêm Vào Yêu Thích!" });
      }

      const resFavorites = await sendRequest<{
        message: string;
        data: IBookLike[];
      }>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like/${user.id}`,
        method: "GET",
      });

      if (resFavorites?.data) {
        setFavoriteList(resFavorites.data);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu thích:", error);
      notification.error({
        message: "Không thể cập nhật danh sách yêu thích.",
      });
    }
  };

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
                {discount && discount > 0 && (
                  <div className="lg:w-[44px] w-[40px] lg:h-[44px] h-[40px] absolute z-10 top-[6px] left-[6px] rounded-full bg-yellow-3 flex justify-center items-center">
                    <span className="text-white lg:text-body-bold text-caption-bold">
                      -{discount}%
                    </span>
                  </div>
                )}
                <div className="absolute z-10 top-[6px] right-[6px] opacity-0 transition-all ease-in-out duration-1000 group-hover:opacity-100 flex flex-col gap-[4px]">
                  <div
                    className="lg:w-9 w-8 lg:h-9 h-8 shadow-custom bg-white flex justify-center items-center cursor-pointer"
                    onClick={() => handleAddToCart(book)}
                  >
                    <BsCartPlus className="text-[22px] text-red1" />
                  </div>
                  <div
                    className="lg:w-9 w-8 lg:h-9 h-8 shadow-custom bg-white flex justify-center items-center cursor-pointer"
                    onClick={() => handleToggleFavorite(_id)}
                  >
                    {favoriteList.some((item) => item.id_book._id === _id) ? (
                      <MdFavorite className="text-[22px] text-red-500" />
                    ) : (
                      <MdOutlineFavoriteBorder className="text-[22px] text-red-500" />
                    )}
                  </div>
                </div>
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
                      {ratings[_id] && ratings[_id] > 0 ? (
                        <Rate disabled allowHalf value={ratings[_id]} />
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
