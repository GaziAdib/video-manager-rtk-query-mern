import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth?.accessToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({}),
});