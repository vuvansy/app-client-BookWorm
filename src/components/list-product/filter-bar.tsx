import { Select } from "antd";
import { useState, useEffect } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    category?: string | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    sortBy?: string;
  }) => void;
  onPageSizeChange: (size: number) => void;
}

const SORT_OPTIONS = [
  { label: "Bán Chạy Tuần", value: "banchay_tuan" },
  { label: "Mới nhất", value: "moinhat" },
  { label: "Bán Chạy Tháng", value: "banchay_thang" },
  { label: "Giá tăng dần", value: "giatang" },
  { label: "Giá giảm dần", value: "giagiam" },
];

const PAGE_SIZE_OPTIONS = [
  { label: "12 sản phẩm", value: 12 },
  { label: "24 sản phẩm", value: 24 },
  { label: "48 sản phẩm", value: 48 },
];

const FilterBar: React.FC<FilterProps> = ({
  onFilterChange,
  onPageSizeChange,
}) => {
  const [filters, setFilters] = useState({
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: "moinhat",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-4 items-center pb-[15px] pt-[20px] pr-[15px] bg-white shadow-md">
      <span className="text-caption pl-[30px]">Sắp xếp theo :</span>
      <Select
        className="text-[12px]"
        value={filters.sortBy}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, sortBy: value }))
        }
        style={{ width: 160 }}
        options={SORT_OPTIONS}
      />

      <Select
        className="text-[12px]"
        defaultValue={12}
        onChange={onPageSizeChange} // Gọi trực tiếp mà không lưu vào state
        style={{ width: 160 }}
        options={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};

export default FilterBar;
