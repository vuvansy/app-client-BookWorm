import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsBoxProps {
  posts: IPost[]; // Bắt buộc phải có posts, không để dấu ? nữa
}

const NewsBox: React.FC<NewsBoxProps> = ({ posts }) => {
  return (
    <div className="flex gap-[30px] pb-5 px-5 lg:px-0">
      {/* Lấy bài viết đầu tiên */}
      {posts.length > 0 && (
        <div className="w-[48%] lg:block hidden">
          <Link href={`/news/${posts[0]._id}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/post/${posts[0].image}`}
              alt={posts[0].title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              className="w-full"
            />
            <p className="text-sub-heading-bold pl-[10px] pt-[15px]">
              {posts[0].title}
            </p>
            <p className="text-caption pl-[10px]">{posts[0].excerpt}</p>
          </Link>
        </div>
      )}

      {/* Danh sách posts từ API */}
      <div className="lg:w-[48%] w-full flex flex-wrap gap-2">
  <div className="grid grid-cols-1 gap-4">
    {posts.slice(1).map((post) => (
      <Link key={post._id} href={`/news/${post._id}`}>
        <div className="w-full flex gap-x-[16px] border cursor-pointer hover:bg-gray-100 transition">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/post/${post.image}`}
            alt={post.title}
            width={160}
            height={105}
            className="object-cover w-[120px] h-[80px] md:w-[140px] md:h-[90px] lg:w-[160px] lg:h-[105px]"
          />
          <div>
            <p className="lg:text-sub-heading-bold text-caption-bold line-clamp-1">
              {post.title}
            </p>
            <p className="lg:text-caption text-info line-clamp-3">
              {post.excerpt}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

    </div>
  );
};

export default NewsBox;
