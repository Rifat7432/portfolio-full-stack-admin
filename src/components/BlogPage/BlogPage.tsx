"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import BlogCard from "../HomePage/BlogCard";
import { useGetBlogsQuery } from "@/redux/features/blogs/blogApi";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/user/userSlice";
import Spiner from "../Spiner/Spiner";

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetBlogsQuery("");

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);
  if (loading) {
    return <Spiner></Spiner>;
  }
  if (!data && !loading) {
    return <div className="flex items-center justify-center h-96 text-center"><p className="text-4xl font-bold text-slate-800">No Blog Found</p></div>;
  }
  return (
    <div className="w-11/12 mx-auto pt-20 pb-10">
      <div className="flex items-center justify-start py-5">
        <p className="w-full h-1 mr-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>

        <h1 className="text-4xl font-semibold text-slate-600">
          BL
          <span className="text-blue-500">O</span>GS
        </h1>
        <p className="w-full h-1 ml-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map(
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

export default BlogPage;
