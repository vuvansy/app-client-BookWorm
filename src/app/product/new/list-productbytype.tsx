import BoxProductHome from "@/components/list-product/box-product-home";
import { Pagination } from "antd";
import { useState, useMemo } from "react";

interface Props {
  dataBookNew?: IBook[];
}

const ListProductByType = ({ dataBookNew = [] }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return dataBookNew.slice(startIndex, startIndex + pageSize);
  }, [dataBookNew, currentPage]);

  return (
    <div className="bg-white overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 mt-4 lg:mb-6 mb-3">
        {paginatedData.map((book, index) => (
          <BoxProductHome key={index} {...book} />
        ))}
      </div>

      <div className="flex justify-center my-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dataBookNew.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ListProductByType;
