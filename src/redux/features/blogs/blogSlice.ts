import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TBlog = {
  _id: string;
  image: string;
  title: string;
  description: string;
};
type TValue = {
  blog: TBlog[];
};
const initialState: TValue = {
  blog: [],
};
// product slice
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    storBlogData: (state, actions: PayloadAction<TBlog[]>) => {
        console.log(actions.payload);
      state.blog = actions.payload;
    },
  },
});
export const { storBlogData } = blogSlice.actions;
export default blogSlice.reducer;
