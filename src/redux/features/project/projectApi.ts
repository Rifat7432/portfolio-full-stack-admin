import { baseApi } from "@/redux/services/API";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (project) => {
        return {
          url: "project",
          method: "POST",
          body: project,
        };
      },
    }),
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

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
} = projectApi;
