"use client";
import React, { useEffect, useState } from "react";
import BoxProduct from "@/components/list-product/box-product";
import { sendRequest } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import { Empty, Spin } from "antd";

const ProductFavorite = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentApp();
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await sendRequest<IBackendRes<IBookLike>>({
          url: `http://localhost:4000/api/v1/book-like/${user.id}`,
          method: "GET",
        });
        console.log(res.data);
        setFavoriteBooks(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Lỗi khi lấy sách yêu thích:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spin size="large">
          <span className="text-gray-600">Loading...</span>
        </Spin>
      </div>
    );
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
        {favoriteBooks.map((book, index) => (
          <BoxProduct key={index} {...book} />
        ))}
      </div>
    </div>
  );
};

export default ProductFavorite;
