"use client";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import BoxProduct from "./box-product";
import FilterBar from "./filter-bar";
import { Divider } from "antd";

interface Product {
  id: string;
  image: string;
  name: string;
  priceOld: number;
  priceNew: number;
  rating: number;
  category: string;
}

interface Arrange {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
  pageSize: number;
}

interface ListProductProps {
  products: Product[];
  filters: {
    priceFrom: number | null;
    priceTo: number | null;
  };
}

const ListProduct = ({ products, filters }: ListProductProps) => {
  const [arrange, setArrange] = useState<Arrange>({
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: "moinhat",
    pageSize: 12,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let newFilteredProducts = products.filter((product) => {
      if (arrange.category && product.category !== arrange.category)
        return false;
      const minPrice = filters.priceFrom ?? arrange.minPrice;
      const maxPrice = filters.priceTo ?? arrange.maxPrice;

      if (minPrice !== null && product.priceNew < minPrice) return false;
      if (maxPrice !== null && product.priceNew > maxPrice) return false;
      return true;
    });

    if (arrange.sortBy === "giatang") {
      newFilteredProducts.sort((a, b) => a.priceNew - b.priceNew);
    } else if (arrange.sortBy === "giagiam") {
      newFilteredProducts.sort((a, b) => b.priceNew - a.priceNew);
    }

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // Reset trang về 1 khi thay đổi bộ lọc
  }, [products, arrange, filters]);

  // Lấy danh sách sản phẩm cho trang hiện tại
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * arrange.pageSize,
    currentPage * arrange.pageSize
  );

  return (
    <div className="w-[75%] bg-white rounded-lg ">
      <div className="flex justify-center flex-wrap">
        <FilterBar
          onFilterChange={(newarrange) =>
            setArrange((prev) =>
              JSON.stringify(prev) ===
              JSON.stringify({ ...prev, ...newarrange })
                ? prev
                : { ...prev, ...newarrange }
            )
          }
          onPageSizeChange={(size) =>
            setArrange((prev) =>
              prev.pageSize === size ? prev : { ...prev, pageSize: size }
            )
          }
        />
        <Divider className="!my-0" />
        <div className="pb-[20px]  flex flex-col">
          <div className="w-full ml-[3px] flex flex-wrap gap-y-[10px] gap-x-[10px] mt-[10px] mb-[25px] px-[2px]">
            {paginatedProducts.length > 0 &&
              paginatedProducts.map((product) => (
                <BoxProduct key={product.id} {...product} />
              ))}
          </div>

          <Pagination
            className="text-center text-caption"
            current={currentPage}
            total={filteredProducts.length}
            pageSize={arrange.pageSize}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
