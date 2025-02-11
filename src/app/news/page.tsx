import MainContent from "@/app/news/maincontent-news";
import Sidebar from "@/app/news/sidebar-news";

function news() {
    return ( 
     <main className="bg-bg-main pt-[20px] ">
           <div className="container flex w-full pt-[3px] pb-[18px] px-[10px] bg-white rounded-lg">
           <Sidebar/>
           <div className="flex-1">
            <MainContent/>
           </div>
        </div>
     </main>
     );
}

export default news;