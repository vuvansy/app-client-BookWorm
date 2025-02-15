"use client";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import BoxProduct from "./box-product";
import FilterBar from "./filter-bar";

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
    <div className="w-[925px] bg-white flex flex-wrap justify-center rounded-lg overflow-hidden">
      <div className="w-[925px] pt-[20px] border-none overflow-hidden shadow-none">
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
      </div>
      <div>
        <div className="pb-[20px] overflow-hidden flex flex-col">
          <div className="w-[915px] flex flex-wrap gap-y-[10px] gap-x-[10px] mt-[10px] mb-[25px] px-[2px]">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <BoxProduct key={product.id} {...product} />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                Không có sản phẩm nào phù hợp.
              </p>
            )}
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
