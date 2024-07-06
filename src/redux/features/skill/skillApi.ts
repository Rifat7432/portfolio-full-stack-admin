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
    createSkill: builder.mutation({
      query: (skill) => {
        return {
          url: "skill",
          method: "POST",
          body:skill
        };
      },
    }),
  }),
});

export const { useGetSkillsQuery,useCreateSkillMutation } = skillApi;
