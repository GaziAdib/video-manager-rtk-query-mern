import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from '../features/api/rootApi';
import videoSlice from '../features/videos/videoSlice';


export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    videos: videoSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(rootApi.middleware),
});
