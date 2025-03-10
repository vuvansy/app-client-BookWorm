"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumb, Divider } from "antd";
import { FaBook } from "react-icons/fa";
import CategoryFilter from "./category-filter";
import SortFilter from "./filter-sort";
import { sendRequest } from "@/utils/api";
import ListProductByType from "./list-productbytype";

interface Props {
  dataBookNew: IBook[];
}

const BoxProductByType = ({ dataBookNew }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedSort, setSelectedSort] = useState("Mới Nhất");
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [books, setBooks] = useState<IBook[]>(dataBookNew);
  const [loading, setLoading] = useState(false);

  // Lấy danh mục thể loại
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await sendRequest<IBackendRes<IGenre[]>>({
          url: "http://localhost:4000/api/v1/genre",
          method: "GET",
        });
        setGenres(response.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục", error);
      }
    };

    fetchGenres();
  }, []);

  // Lấy danh sách sản phẩm theo danh mục
  useEffect(() => {
    const fetchBooksByCategory = async () => {
      if (selectedCategory === "Tất cả") {
        setBooks(dataBookNew);
        return;
      }

      const selectedGenre = genres.find(
        (genre) => genre.name === selectedCategory
      );
      if (!selectedGenre) return;

      setLoading(true);
      try {
        const response = await sendRequest<IBackendRes<IBook[]>>({
          url: `http://localhost:4000/api/v1/book/67c17c1946946595bbea523a/genre/${selectedGenre._id}`,
          method: "GET",
        });

        setBooks(response.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo danh mục", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByCategory();
  }, [selectedCategory, genres, dataBookNew]);

  // Sắp xếp danh sách sản phẩm bằng
  const sortedBooks = useMemo(() => {
    let sorted = [...books];

    switch (selectedSort) {
      case "Giá Tăng Dần":
        sorted.sort((a, b) => (a.price_new ?? 0) - (b.price_new ?? 0));
        break;
      case "Giá Giảm Dần":
        sorted.sort((a, b) => (b.price_new ?? 0) - (a.price_new ?? 0));
        break;
      case "Mới Nhất":
        sorted.sort(
          (a, b) =>
            (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
            (a.createdAt ? new Date(a.createdAt).getTime() : 0)
        );
        break;
      default:
        break;
    }

    return sorted;
  }, [books, selectedSort]);

  return (
    <div className="bg-bg-main px-2 pb-[1px] xl:px-0">
      <div className="container py-[8px]">
        <Breadcrumb
          items={[
            { title: "Trang Chủ" },
            { title: <div className="capitalize">Sản Phẩm Mới Ra Mắt</div> },
          ]}
        />
      </div>

      <div className="container h-auto rounded-lg overflow-hidden mb-5">
        <div className="flex bg-[#FCDDEF] lg:py-4 py-2 pr-4 pl-4">
          <FaBook className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-[#C92127]">
            Sản Phẩm Mới Ra Mắt
          </p>
        </div>

        <CategoryFilter
          Genge={genres}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Divider className="!my-0" />
        <SortFilter
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
        />

        {loading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : (
          <ListProductByType dataBookNew={sortedBooks} />
        )}
      </div>
    </div>
  );
};

export default BoxProductByType;
