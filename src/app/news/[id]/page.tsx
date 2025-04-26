
import SidebarAbout from "@/app/news/[id]/sidebar-new";
import { notFound } from "next/navigation";
import { sendRequest } from "@/utils/api";
export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
 
  const res = await sendRequest<IBackendRes<IPost>>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/post/${params.id}`,
    method: "GET",
  });

  if (!res.data) {
    return notFound();
  }
  const post = res.data;

  return (
    <main className="bg-bg-main pt-[20px]">
      <div className="container flex flex-col lg:flex-row bg-white rounded-lg p-6">
        <article className="lg:w-7/12 w-full">
          <h1 className="text-[20px] font-bold mb-2">{post.title}</h1>
          <p className="text-info mb-4">
            Cập nhật: {new Date(post.updatedAt).toLocaleString("vi-VN")}
          </p>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <aside className="lg:w-5/12 w-full pl-6">
          <SidebarAbout />
        </aside>
      </div>
    </main>
  );
}
