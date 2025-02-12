import FilterBarLeft from "@/components/list-product/filter-bar-left";
import ListProduct from "@/components/list-product/list-product";

export default function Page() {
  return (
    <main className="bg-bg-main">
      <div className="container pt-[40px] flex gap-4">
        <div className="max-w-[290px]">
          <FilterBarLeft />
        </div>
        <ListProduct />
      </div>
    </main>
  );
}
