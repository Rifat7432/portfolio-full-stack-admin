"use client";

import { useGetBlogsQuery } from "@/redux/features/blogs/blogApi";
import { setLoading } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import BlogCard from "./BlogCard";
import { storBlogData } from "@/redux/features/blogs/blogSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogSection = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetBlogsQuery("");

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  if (loading || !data) {
    return <div></div>;
  }
  if (data) {
    dispatch(storBlogData(data.data));
  }
  return (
    <div data-aos="zoom-in-up" className="w-11/12 mx-auto pt-20 pb-10">
      <div className="flex items-center justify-start py-5">
        <p className="w-full h-1 mr-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
        <h1 className="text-4xl font-semibold text-slate-600">
          BL<span className="text-blue-500">O</span>G
        </h1>
        <p className="w-full h-1 ml-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data
          .slice(0, 6)
          .map(
            (blog: {
              _id: string;
              image: string;
              title: string;
              description: string;
            }) => (
              <BlogCard key={blog.title} blog={blog}></BlogCard>
            )
          )}
      </div>
    </div>
  );
};

export default BlogSection;
