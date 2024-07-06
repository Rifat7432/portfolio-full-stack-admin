import { baseApi } from "@/redux/services/API";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => {
        return {
          url: "project",
          method: "GET",
        };
      },
    }),
    getProject: builder.query({
      query: (id) => {
        return {
          url: `project/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectQuery } = projectApi;
