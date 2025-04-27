"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { message, Skeleton, Pagination } from "antd";
import useSWR from "swr";
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

export default function MainContent() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [meta, setMeta] = useState({ pages: 0, total: 0 });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await sendRequest<IBackendRes<PostData>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/post`,
        method: "GET",
        queryParams: { page, limit },
      });
      if (res.data?.result) {
        setPosts(res.data.result);
        setMeta({ pages: res.data.meta.pages, total: res.data.meta.total });
      } else {
        message.error("Không tải được danh sách Post.");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi lấy dữ liệu Post.");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);



  return (
    <Skeleton active loading={loading} paragraph={{ rows: limit }}>
      <div className="space-y-4 min-h-[200px]">
        {posts.length ? (
          posts
            .filter((item) => item.status)
            .map((item) => (
              <div
                key={item._id}
                className="flex flex-row items-start space-x-4 py-4 border-b border-gray-200"
              >
                <div className="flex-none w-[300px] h-[180px] shrink-0">
                  <Link
                    href={`/news/${item._id}`}
                    className="block relative w-full h-full"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/post/${item.image}`}
                      alt={item.title}
                      fill
                      sizes="300px"
                      className="object-cover rounded"
                    />
                  </Link>
                </div>

                <div className="flex-1">
                  <Link href={`/news/${item._id}`}>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-info mt-2"> {new Date(item.updatedAt).toLocaleString("vi-VN")}</p>
                  <Link href={`/news/${item._id}`}>
                    <p className="text-caption mt-2">{item.excerpt}</p>
                  </Link>
                </div>
              </div>
            ))
        ) : (
          <div className="text-gray-500 text-center py-8">
            Chưa có bài viết.
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Pagination
            current={page}
            pageSize={limit}
            total={meta.total}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      </div>
    </Skeleton>
  );
}
