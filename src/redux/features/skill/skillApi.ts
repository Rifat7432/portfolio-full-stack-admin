import { baseApi } from "@/redux/services/API";


const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => {
        return {
          url: "skills",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSkillsQuery } = skillApi;
