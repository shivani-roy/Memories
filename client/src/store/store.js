import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slice/posts/postsSlice.js";
import authReducer from "../slice/auth/authSlice.js";

export const store = configureStore({
  reducer: { posts: postReducer, auth: authReducer },
});
