
import { Select } from "antd";

interface FilterProps {
  onPageSizeChange: (size: number) => void;
  onSortChange: (sort: string) => void;
}
const SORT_OPTIONS = [
  { label: "Mới nhất", value: "-createdAt" },
  { label: "Cũ nhất", value: "createdAt" },
  { label: "Giá tăng dần", value: "price_new" },
  { label: "Giá giảm dần", value: "-price_new" },
];
const PAGE_SIZE_OPTIONS = [
  { label: "12 sản phẩm", value: 12 },
  { label: "24 sản phẩm", value: 24 },
  { label: "48 sản phẩm", value: 48 },
];

const FilterBar: React.FC<FilterProps> = ({onSortChange,onPageSizeChange }) => {
  return (
    <div className="w-full pt-[20px] max-h-[87px]">
      <div className="flex gap-x-4 items-center pb-[15px] pt-[20px] pr-[15px] bg-white">
        <span className="text-caption pl-[30px]">Xắp xếp theo:</span>
        <Select
          className="text-[12px]"
          style={{ width: 160 }}
          options={SORT_OPTIONS}
          defaultValue="-createdAt" 
          onChange={onSortChange}
        />
        <Select
          className="text-[12px]"
          defaultValue={12}
          onChange={onPageSizeChange} 
          style={{ width: 160 }}
          options={PAGE_SIZE_OPTIONS}
        />
      </div>
    </div>
  );
};

export default FilterBar;
