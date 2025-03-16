import { Pagination, Divider } from "antd";
import BoxProduct from "./box-product";
import FilterBar from "./filter-bar";

interface ListProductProps {
  products: IBook[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
  onSortChange: (sort: string) => void;
}

const ListProduct = ({
  products,
  totalPages,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onSortChange,
}: ListProductProps) => {
  return (
    <div className="bg-white rounded-lg">
      <FilterBar
        onPageSizeChange={onItemsPerPageChange}
        onSortChange={onSortChange}
      />
      <Divider className="!my-0" />

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 px-4 py-6">
            {products.map((product) => (
              <BoxProduct key={product._id} {...product} />
            ))}
          </div>

          <div className="flex justify-center pb-6">
            <Pagination
              className="text-caption"
              current={currentPage}
              total={totalPages * itemsPerPage}
              pageSize={itemsPerPage}
              onChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg py-10 min-h-[443px]">
          Không tìm thấy sản phẩm nào phù hợp với bộ lọc!
        </p>
      )}
    </div>
  );
};

export default ListProduct;
