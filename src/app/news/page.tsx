import MainContent from "@/app/news/maincontent-news";
import Sidebar from "@/app/news/sidebar-news";

function news() {
  return (
    <main className="bg-bg-main pt-[20px]">
      <div className="container flex flex-col md:flex-row w-full pt-[3px] pb-[18px] px-[10px] bg-white rounded-lg">
        <div className="w-full  md:w-[30%]">
          <Sidebar />
        </div>
        <div className="hidden sm:block w-full md:w-[70%]">
          <MainContent />
        </div>
      </div>
    </main>
  );
}

export default news;
