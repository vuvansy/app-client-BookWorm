"use client";
import FilterBarLeft from "@/components/list-product/filter-bar-left";
import ListProduct from "@/components/list-product/list-product";
import { useState } from "react";

const products = [
  {
    id: "1",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12Bocchi The Rock! - Tập 6 - Tặng Kèm Kẹp File",
    priceOld: 50000,
    priceNew: 38000,
    rating: 5,
    category: "comic",
  },
  {
    id: "2",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12Bocchi The Rock! - Tập 6 - Tặng Kèm Kẹp File",
    priceOld: 120000,
    priceNew: 92460,
    rating: 4.5,
    category: "business",
  },
  {
    id: "3",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12Bocchi The Rock! - Tập 6 - Tặng Kèm Kẹp File",
    priceOld: 150000,
    priceNew: 118300,
    rating: 4.5,
    category: "selfhelp",
  },
  {
    id: "4",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12Bocchi The Rock! - Tập 6 - Tặng Kèm Kẹp File",
    priceOld: 300000,
    priceNew: 273000,
    rating: 3.5,
    category: "history",
  },
  {
    id: "5",
    image: "/9786044067162.webp",
    name: "Nhóc Maruko - Tập 12Bocchi The Rock! - Tặng Kèm Kẹp File",
    priceOld: 110000,
    priceNew: 91200,
    rating: 3.5,
    category: "education",
  },
];

export default function CategoryById() {
  const [filters, setFilters] = useState<{
    priceFrom: number | null;
    priceTo: number | null;
  }>({
    priceFrom: null,
    priceTo: null,
  });
  const handleFilterChange = (newFilters: {
    priceFrom: number | null;
    priceTo: number | null;
  }) => {
    setFilters(newFilters);
  };
  return (
    <main className="bg-bg-main">
      <div className="container pt-[20px] flex gap-4">
        <div className="w-[24%]">
          <FilterBarLeft onFilterChange={setFilters} />
        </div>
        <ListProduct products={products} filters={filters} />
      </div>
    </main>
  );
}
