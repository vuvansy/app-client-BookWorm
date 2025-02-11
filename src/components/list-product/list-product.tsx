"use client";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import BoxProduct from "./box-product";
import FilterBar from "./filter-bar";

const products = [
  {
    id: "1",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12",
    priceOld: 50000,
    priceNew: 38000,
    rating: 5,
    category: "comic",
  },
  {
    id: "2",
    image: "/9786044067162.webp",
    name: "38 Bức Thư Rockefeller",
    priceOld: 120000,
    priceNew: 92460,
    rating: 4.5,
    category: "business",
  },
  {
    id: "3",
    image: "/9786044067162.webp",
    name: "Mặt Dày Tâm Đen",
    priceOld: 150000,
    priceNew: 118300,
    rating: 4.5,
    category: "selfhelp",
  },
  {
    id: "4",
    image: "/9786044067162.webp",
    name: "Văn Minh Vật Chất",
    priceOld: 300000,
    priceNew: 273000,
    rating: 3.5,
    category: "history",
  },
  {
    id: "5",
    image: "/9786044067162.webp",
    name: "Tiếng Anh Thương Mại",
    priceOld: 110000,
    priceNew: 91200,
    rating: 3.5,
    category: "education",
  },
  {
    id: "6",
    image: "/9786044067162.webp",
    name: "Mặt Dày Tâm Đen",
    priceOld: 150000,
    priceNew: 118300,
    rating: 4.5,
    category: "selfhelp",
  },
  {
    id: "7",
    image: "/9786044067162.webp",
    name: "Văn Minh Vật Chất",
    priceOld: 300000,
    priceNew: 273000,
    rating: 3.5,
    category: "history",
  },
  {
    id: "8",
    image: "/9786044067162.webp",
    name: "Tiếng Anh Thương Mại",
    priceOld: 110000,
    priceNew: 91200,
    rating: 3.5,
    category: "education",
  },
  ,
  {
    id: "9",
    image: "/9786044067162.webp",
    name: "Tiếng Anh Thương Mại",
    priceOld: 110000,
    priceNew: 91200,
    rating: 3.5,
    category: "education",
  },
  {
    id: "10",
    image: "/9786044067162.webp",
    name: "Tiếng Anh Thương Mại",
    priceOld: 110000,
    priceNew: 91200,
    rating: 3.5,
    category: "education",
  },
];

const ListProduct = () => {
  const [filters, setFilters] = useState<{
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string;
    pageSize: number;
  }>({
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: "moinhat",
    pageSize: 12,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Xử lý filter
  useEffect(() => {
    let filtered = products.filter((product) => {
      if (!product) return false; 
      if (filters.category && product.category !== filters.category)
        return false;
      if (filters.minPrice && product.priceNew < filters.minPrice) return false;
      if (filters.maxPrice && product.priceNew > filters.maxPrice) return false;
      return true;
    });

    if (filters.sortBy === "giatang") {
      filtered.sort((a, b) => (a?.priceNew ?? 0) - (b?.priceNew ?? 0));
    }

    if (filters.sortBy === "giagiam") {
      filtered.sort((a, b) => (b?.priceNew ?? 0) - (a?.priceNew ?? 0));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters.category, filters.minPrice, filters.maxPrice, filters.sortBy]);

  // Tính toán danh sách sản phẩm theo trang
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * filters.pageSize,
    currentPage * filters.pageSize
  );

  return (
    <div className="max-w-[925px] mx-auto rounded-lg overflow-hidden">
      <div className="max-w-[915px] ">
        <FilterBar
          onFilterChange={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters }))
          }
          onPageSizeChange={(size) =>
            setFilters((prev) => ({ ...prev, pageSize: size }))
          }
        />
        <div className="bg-white overflow-hidden pb-[10px]  flex flex-col">
          <div className="flex flex-wrap gap-y-[10px] gap-x-[10px] mt-[10px] mb-[25px] px-[2px]">
            {paginatedProducts?.length > 0 &&
              paginatedProducts.map(
                (product) =>
                  product && <BoxProduct key={product.id} {...product} />
              )}
          </div>

          <Pagination
            className="text-center text-caption "
            current={currentPage}
            total={filteredProducts.length}
            pageSize={filters.pageSize}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
