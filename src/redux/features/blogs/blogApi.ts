import { baseApi } from "@/redux/services/API";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetBlogsQuery, useGetBlogQuery } = blogApi;
