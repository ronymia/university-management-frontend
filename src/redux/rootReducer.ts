import { baseApi } from "./api/baseApi";

export const reducer = {
  // posts: postsReducer,
  // comments: commentsReducer,
  // users: usersReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
