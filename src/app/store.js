import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from '../features/api/rootApi';
import authSlice from '../features/auth/authSlice';
import commentSlice from '../features/comments/commentSlice';
import videoSlice from '../features/videos/videoSlice';
import wishlistSlice from '../features/wishlists/wishlistSlice';
import blogSlice from '../features/blogs/blogSlice';
import blogCommentSlice from '../features/blogComments/blogCommentSlice';
import profileSlice from '../features/profiles/profileSlice';


export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    videos: videoSlice,
    wishlists: wishlistSlice,
    comments: commentSlice,
    auth: authSlice,
    blogs: blogSlice,
    blogcomments: blogCommentSlice,
    profiles: profileSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(rootApi.middleware),
});
