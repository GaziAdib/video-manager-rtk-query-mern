import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from '../features/api/rootApi';


export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(rootApi.middleware),
});
