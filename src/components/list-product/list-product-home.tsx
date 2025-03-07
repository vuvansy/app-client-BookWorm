import BoxProductHome from "./box-product-home";

interface Props {
  dataBookNew?: IBook[];
}
const ListProductHome = (props: Props) => {
  const { dataBookNew } = props;
  return (
    <div className="bg-white overflow-hidden ">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 mt-4 lg:mb-6 mb-3">
        {dataBookNew?.map((dataBookNew, index) => (
          <BoxProductHome key={index} {...dataBookNew} />
        ))}
      </div>
      <div className="flex justify-center lg:mb-6 mb-4">
        <button className="h-9 w-48 flex justify-center items-center gap-x-2 text-red-500 text-body-bold bg-white border border-red-500 rounded-lg hover:text-white hover:bg-red-500 transition">
          <span>Xem thêm</span>
        </button>
      </div>
    </div>
  );
};

export default ListProductHome;
