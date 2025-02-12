import MaincontentAbout from "@/app/about/maincontent-about";
import SidebarAbout from "@/app/about/sidebar-about";

function About() {
  return (
    <main className="bg-bg-main pt-[20px] ">
      <div className="container flex w-full py-[18px] px-[10px] bg-white rounded-lg">
        <MaincontentAbout/>
        <SidebarAbout/>
      </div>
    </main>
  );
}

export default About;
