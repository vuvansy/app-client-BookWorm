import SidebarAbout from "@/app/news/[id]/sidebar-new";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
}

const posts: Post[] = [
  {
    id: 1,
    image: "/post1.webp",
    title:
      "Bản tiếng Việt cuốn sách mới của Yuval Noah Harari sắp ra mắt độc giả Việt Nam NEXUS",
    description:
      "Ấn bản tiếng Việt của cuốn sách “NEXUS: A Brief History of Information Networks…” sẽ chính thức ra mắt…",
    date: "07/02/2023",
  },
];

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <p>Không tìm thấy tin tức với ID {params.id}</p>;
  }
  return (
    <main className="bg-bg-main pt-[20px]">
    <div className="container flex flex-col lg:flex-row w-full py-[18px] px-[10px] bg-white rounded-lg">
      <div className="w-full lg:w-[70%]">
      <main className="flex-1">
        <h1 className="text-[24px] font-bold mb-2">{post.title}</h1>
        <p className="text-info mb-2">{post.date}</p>
        {/* <div className="w-full h-[400px] relative mb-6">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded"
          />
        </div> */}
        <p className="text-base leading-relaxed">{post.description}</p>
        {/* <Link
          href="/news"
          className="mt-6 inline-block text-primary underline"
        >
          ← Quay lại danh sách tin
        </Link> */}
      </main>
      </div>
      <div className="w-full lg:w-[30%]">
        <SidebarAbout />
      </div>
    </div>
  </main>
  );
}
