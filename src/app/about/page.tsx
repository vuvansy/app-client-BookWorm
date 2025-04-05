import MaincontentAbout from "@/app/about/maincontent-about";
import SidebarAbout from "@/app/about/sidebar-about";

function About() {
  return (
    <main className="bg-bg-main pt-[20px]">
      <div className="container flex flex-col lg:flex-row w-full py-[18px] px-[10px] bg-white rounded-lg">
        <div className="w-full lg:w-[70%]">
          <MaincontentAbout />
        </div>
        <div className="w-full lg:w-[30%]">
          <SidebarAbout />
        </div>
      </div>
    </main>
  );
}

export default About;
