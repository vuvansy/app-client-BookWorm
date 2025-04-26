
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";
import Image from "next/image";
import { Skeleton, message } from "antd";
import { sendRequest } from "@/utils/api";

type PostData = {
  meta: {
    page: number;
    limit: number;
    pages: number;
    total: number;
  };
  result: IPost[];
};

export default function SidebarNew() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: 5, pages: 0, total: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm fetch với queryParams page & limit từ meta
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await sendRequest<IBackendRes<PostData>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/post`,
        method: "GET",
        queryParams: { page: meta.page, limit: meta.limit },
      });
      if (res.data?.result) {
        setPosts(res.data.result);
        setMeta(res.data.meta);
      } else {
        message.error("Không tải được danh sách Post.");
      }
    } catch (err: any) {
      console.error(err);
      message.error("Lỗi khi lấy dữ liệu Post.");
    } finally {
      setLoading(false);
    }
  }, [meta.page, meta.limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <aside className="w-full px-[10px]  md:sticky md:top-0">
   
      <h2 className="text-body-bold  h-[22px]">Tin nổi bật</h2>
      <div className="text-[#333333]">
        {loading ? (
          // Skeleton 5 dòng khi loading
          Array.from({ length: meta.limit }).map((_, idx) => (
            <Skeleton active 
              key={idx}
              paragraph={{ rows: 1, width: ['80%'] }}
              className="mb-3"
            />
          ))
        ) : (
          posts.map((item) => (
            <div
              key={item._id}
              className="flex flex-row items-start space-x-4 py-4 border-b border-gray-200"
            >
               <div className="flex-none shrink-0">
                <Link href={`/news/${item._id}`}> {/* Link không cần relative */}
                  <div className="relative w-[180px] h-[100px] sm:w-[200px] sm:h-[120px] md:w-[88px] md:h-[58px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/post/${item.image}`}
                      alt={item.title}
                      fill
                      priority
                      sizes="(max-width: 639px) 180px, (max-width: 767px) 200px, 88px"
                      className="object-cover rounded"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex-1">
                <Link href={`/news/${item._id}`}>
                  <h3 className="text-caption-bold md:text-caption md:font-normal line-clamp-3">
                    {item.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
