"use client";
import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import Swal from "sweetalert2";
import type { RootState } from "@/redux/store";
import { App } from "antd";
import { useRouter } from "next/navigation";
import { MdFavorite } from "react-icons/md";
import { useEffect } from "react";
import { sendRequest } from "@/utils/api";
import { useState } from "react";
import { useSession } from "next-auth/react";

const BoxProductHome = (props: IBook) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;
  const { _id, image, name, price_old, price_new, quantity } = props;
  const [favoriteList, setFavoriteList] = useState<IBookLike[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { message, notification } = App.useApp();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const discount =
    price_new && price_old && price_new < price_old
      ? Math.round(((price_old - price_new) / price_old) * 100)
      : null;

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const res = await sendRequest<{
          message: string;
          data: IBookLike[];
        }>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like/${userId}`,
          method: "GET",
        });

        if (res?.data) {
          setFavoriteList(res.data);
          setIsFavorite(res.data.some((item) => item.id_book._id === _id));
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, _id]);

  const handleToggleFavorite = async (bookId: string) => {
    if (!userId) {
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
        notification.success({
          message: "Thông báo",
          description: "Đã Bỏ Yêu Thích!",
        });
      } else {
        const res = await sendRequest<{ message: string; data: IBookLike }>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like`,
          method: "POST",
          body: { id_user: userId, id_book: bookId },
        });

        if (res?.data) {
          notification.success({
            message: "Thông báo",
            description: "Đã Thêm Vào Sản Phẩm Yêu Thích!",
          });
        }
      }
      const resFavorites = await sendRequest<{
        message: string;
        data: IBookLike[];
      }>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like/${userId}`,
        method: "GET",
      });

      if (resFavorites?.data) {
        setFavoriteList(resFavorites.data);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu thích:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể cập nhật danh sách yêu thích.",
      });
    }
  };

  const handleAddToCart = (currentBook: IBook) => {
    if (quantity === 0) return;
    const cartItem = cart.items.find((item) => item._id === currentBook._id);
    const maxQuantity =
      typeof currentBook.quantity === "number" ? currentBook.quantity : 0;
    const currentCartQuantity = cartItem?.quantity ?? 0;
    if (currentCartQuantity + 1 > maxQuantity) {
      notification.warning({
        message: "Lỗi Số Lượng",
        description: `Số lượng yêu cầu cho ${1 + currentCartQuantity
          } sản phẩm không có sẵn.`,
        placement: "topRight",
      });
      return;
    }

    dispatch(addToCart({ item: currentBook, quantity: 1 }));
    Swal.fire({
      icon: "success",
      title: "Sản phẩm đã được thêm vào giỏ hàng!",
      showConfirmButton: false,
      timer: 2000,
      background: "rgba(0, 0, 0, 0.7)",
      color: "#ffffff",
      customClass: { title: "swal-title" },
      allowOutsideClick: true,
      allowEscapeKey: true,
    });
  };

  const handleBuyNow = (currentBook: IBook) => {
    if (quantity === 0) return;
    dispatch(addToCart({ item: currentBook, quantity: 1 }));
    message.success("Thêm sản phẩm vào giỏ hàng thành công.");
    router.push("/cart");
  };
  return (
    <div className="group w-full sm:max-w-[200px] md:max-w-[232px] ">
      <div className="relative bg-white group-hover:shadow-custom  overflow-hidden">
        {discount && (
          <div className="lg:w-[44px] w-[40px] lg:h-[44px] h-[40px] absolute z-10 top-[6px] left-[6px] rounded-full bg-yellow-3 flex justify-center items-center">
            {discount !== null && (
              <span className="text-white lg:text-body-bold text-caption-bold">
                -{discount}%
              </span>
            )}
          </div>
        )}
        <div className="absolute z-10 top-[6px] right-[6px] opacity-0 transition-all ease-in-out duration-1000 group-hover:opacity-100 flex flex-col gap-[4px]">
          <div
            className="lg:w-9 w-8 lg:h-9 h-8 shadow-custom bg-white flex justify-center items-center cursor-pointer"
            onClick={() => handleAddToCart(props)}
          >
            <BsCartPlus className="text-[22px] text-red1" />
          </div>
          <div
            className="lg:w-9 w-8 lg:h-9 h-8 shadow-custom bg-white flex justify-center items-center cursor-pointer"
            onClick={() => handleToggleFavorite(_id)}
          >
            {!user ? (
              <MdOutlineFavoriteBorder className="text-[22px] text-red-500" /> // Trái tim trắng khi chưa đăng nhập
            ) : !loading &&
              favoriteList.some((item) => item.id_book._id === _id) ? (
              <MdFavorite className="text-[22px] text-red-500" /> // Trái tim đỏ khi đã thích
            ) : (
              <MdOutlineFavoriteBorder className="text-[22px] text-red-500" /> // Trái tim viền đỏ khi chưa thích
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
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  className="w-full h-auto object-cover"
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
            <button
              onClick={() => handleBuyNow(props)}
              className="xl:px-[25px] px-[30px] py-[5px] flex justify-center items-center gap-x-2 text-red1 lg:text-body-bold text-caption-bold bg-white border border-red1 rounded-lg hover:text-white hover:bg-red1"
            >
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
