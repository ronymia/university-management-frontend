import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './rootReducer';
import { baseApi } from './api/baseApi';
import { rtkQueryErrorLogger } from './middlewares/errorMiddleware';

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware).concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
