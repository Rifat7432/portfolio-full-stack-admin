"use client";

import { useGetBlogQuery } from "@/redux/features/blogs/blogApi";
import {
  Card,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import Spiner from "../Spiner/Spiner";
import { MutableRefObject, useRef } from "react";

const BlogDetailCard = ({ id }: { id: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useGetBlogQuery(id);
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  if (!data) {
    return <div></div>;
  }
  const blog = data?.data;
  if (containerRef.current) {
    containerRef.current.innerHTML = blog.description;
  }

  return (
    <Card className="py-20 bg- px-2 w-11/12 mx-auto bg-sky-50 shadow-sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card background"
          className="object-cover w-full rounded-xl"
          src={blog.image}
        />
      </CardHeader>
      <CardFooter className="gap-3 py-10">
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 items-start justify-center">
            <h4 className="text-2xl font-semibold leading-none text-default-600">
              {blog.title}
            </h4>
            <div
              ref={containerRef as MutableRefObject<HTMLDivElement | null>}
              className="text-lg tracking-tight text-default-400"
            ></div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogDetailCard;
