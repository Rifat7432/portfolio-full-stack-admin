import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TUser = {
  name: string;
  email: string;
  password: string;
  image: string;
  image2: string;
  phone: string;
  resume: string;
};
type TValue = {
  user: TUser | null;
  loading:boolean
};
const initialState: TValue = {
  user: null,
  loading:false
};
// product slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storUserData: (state, actions: PayloadAction<TUser>) => {
      state.user = actions.payload;
    },
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.loading = actions.payload;
    },
  },
});
export const { storUserData,setLoading } = userSlice.actions;
export default userSlice.reducer;
