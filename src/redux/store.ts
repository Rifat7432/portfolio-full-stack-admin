import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/API";
import userReducer from "./features/user/userSlice";
import projectReducer from "./features/project/projectSlice";
import blogReducer from "./features/blogs/blogSlice";

// global storage
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userReducer,
    project: projectReducer,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
