import { baseApi } from "@/redux/services/API";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blog) => {
        return {
          url: "blog",
          method: "POST",
          body:blog
        };
      },
    }),
    getBlogs: builder.query({
      query: () => {
        return {
          url: "blogs",
          method: "GET",
        };
      },
    }),
    getBlog: builder.query({
      query: (id) => {
        return {
          url: `blog/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogQuery,useCreateBlogMutation } = blogApi;
