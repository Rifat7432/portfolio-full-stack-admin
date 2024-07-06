import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TProject = {
  _id: string;
  name: string;
  liveLink: string;
  gitHubClientLink: string;
  gitHubServerLink: string;
  images: string[];
  technology: string[];
  description: string;
  details: string[];
};
type TValue = {
  project: TProject[];
};
const initialState: TValue = {
  project: [],
};
// product slice
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    storProjectData: (state, actions: PayloadAction<TProject[]>) => {
      state.project = actions.payload;
    },
  },
});
export const { storProjectData } = projectSlice.actions;
export default projectSlice.reducer;
