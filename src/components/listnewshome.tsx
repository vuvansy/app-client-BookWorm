import React, { useEffect, useState } from "react";
import NewsBox from "./box-news";
import { sendRequest } from "@/utils/api";

interface Meta {
  page: number;
  limit: number;
}

const ListNews = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await sendRequest<{ data: { result: IPost[]; meta: Meta } }>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/post`,
          method: "GET",
          queryParams: {
            page: meta.page,
            limit: meta.limit,
          },
        });
        // console.log(res.data);
        if (res.data) {
          setPosts(res.data.result);
          setMeta(res.data.meta);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); 

  return (
    <div className="container mt-5 bg-white rounded-lg">
      <p className="lg:text-heading3-bold text-sub-heading-bold lg:mb-5 mb-3 lg:pt-5 pt-3 text-center">
        Tin Tức
      </p>

      <NewsBox posts={posts} />
    </div>
  );
};

export default ListNews;
