import { rootApi } from "../api/rootApi";
import { userLoggedIn } from "./authSlice";


export const authAPI = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // register process 
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {

                    const result = await queryFulfilled;

                    // when fulfilled set data to localstorage

                    localStorage.setItem('auth', JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                    // dispatch those data to redux store

                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                } catch (err) {

                }
            }
        }),

        // login process
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {

                    const result = await queryFulfilled;

                    // when fulfilled set data to localstorage

                    localStorage.setItem('auth', JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                    // dispatch those data to redux store

                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                } catch (err) {

                }
            }
        }),
    })
})

export const { useRegisterMutation, useLoginMutation } = authAPI;