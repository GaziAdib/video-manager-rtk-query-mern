import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from '../features/api/rootApi';
import commentSlice from '../features/comments/commentSlice';
import videoSlice from '../features/videos/videoSlice';
import wishlistSlice from '../features/wishlists/wishlistSlice';


export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    videos: videoSlice,
    wishlists: wishlistSlice,
    comments: commentSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(rootApi.middleware),
});
