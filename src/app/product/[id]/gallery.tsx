"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ModalGallery from "./modal.gallery";
import { useCurrentApp } from "@/context/app.context";
import { sendRequest } from "@/utils/api";
import { notification } from "antd";

interface IProps {
  currentBook: IBookTable | null;
}

const GalleryComponent = ({ currentBook }: IProps) => {
  const { user } = useCurrentApp();
  const userId = user?.id;
  const [favoriteList, setFavoriteList] = useState<IBookLike[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageGallery, setImageGallery] = useState<
    {
      original: string;
      thumbnail: string;
      originalClass: string;
      thumbnailClass: string;
    }[]
  >([]);
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const refGallery = useRef<ImageGallery>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const res = await sendRequest<{ message: string; data: IBookLike[] }>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book-like/${userId}`,
          method: "GET",
        });
        if (res?.data) {
          setFavoriteList(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    if (!currentBook) return;
    setIsFavorite(
      favoriteList.some((item) => item.id_book._id === currentBook._id)
    );
  }, [favoriteList, currentBook]);

  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
  };

  const handleToggleFavorite = async () => {
    if (!userId) {
      notification.warning({
        message: "Thông báo",
        description: "Bạn cần đăng nhập để thích sản phẩm!",
      });
      return;
    }

    if (!currentBook) return;
    const bookId = currentBook._id;
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

        setFavoriteList((prev) =>
          prev.filter((item) => item._id !== bookLikeId)
        );
        setIsFavorite(false);
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
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu thích:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể cập nhật danh sách yêu thích.",
      });
    }
  };

  useEffect(() => {
    if (currentBook) {
      const images = [];
      if (currentBook.image) {
        images.push({
          original: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${currentBook.image}`,
          thumbnail: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${currentBook.image}`,
          originalClass: "w-full h-[450px] object-contain",
          thumbnailClass: "!w-[100px] !h-[100px] object-contain",
        });
      }
      if (currentBook.slider) {
        currentBook.slider?.forEach((item) => {
          images.push({
            original: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${item}`,
            thumbnail: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${item}`,
            originalClass: "w-full h-[450px] object-contain",
            thumbnailClass: "w-[100px] h-[100px] object-contain",
          });
        });
      }
      setImageGallery(images);
    }
  }, [currentBook]);

  return (
    <>
      <ImageGallery
        key={currentBook?._id}
        ref={refGallery}
        items={imageGallery}
        showPlayButton={false}
        showFullscreenButton={false}
        renderLeftNav={() => <></>}
        renderRightNav={() => <></>}
        slideOnThumbnailOver={true}
        onClick={() => handleOnClickImage()}
        thumbnailPosition="bottom"
        additionalClass="custom-gallery"
      />

      <button
        onClick={handleToggleFavorite}
        className="absolute top-[180px] md:top-[160px] lg:top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition"
      >
        {!loading &&
          (isFavorite ? (
            <FaHeart className="text-red-500 text-[20px]" />
          ) : (
            <FaRegHeart className="text-gray-500 text-[20px]" />
          ))}
      </button>

      <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={imageGallery}
        title={currentBook?.name ?? ""}
      />
    </>
  );
};

export default GalleryComponent;
