import { rootApi } from "../api/rootApi"

export const videosApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all video
        fetchVideos: builder.query({
            query: () => '/videos',
        }),

        fetchSingleVideo: builder.query({
            query: (id) => `/videos/${id}`,
        }),

        // create Video
        addVideos: builder.mutation({
            query: (data) => ({
                url: '/videos/createVideo',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data: createdVideo } = await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                            draft?.push(createdVideo);
                        })
                    )

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        // delete Video
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {

                    await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData(
                            'fetchVideos',
                            undefined,
                            (draft) => {
                                return draft.filter(
                                    (video) => video?._id !== arg
                                );
                            }
                        )
                    );

                } catch (error) {
                    console.log('error in catch block');
                }
            }
        }),

        // update Video
        updateVideo: builder.mutation({
            query: ({ videoId, data }) => ({
                url: `/videos/${videoId}`,
                method: 'PUT',
                body: data
            }),
        }),

        // update Video like By Users
        likeVideoByAuthor: builder.mutation({
            query: ({ videoId, authorId }) => ({
                url: `/videos/${videoId}/likes`,
                method: 'PATCH',
                body: {
                    likes: authorId
                }
            }),
        }),

        // update Video unlike By Users
        unlikeVideoByAuthor: builder.mutation({
            query: ({ videoId, authorId }) => ({
                url: `/videos/${videoId}/unlikes`,
                method: 'PATCH',
                body: {
                    likes: authorId
                }
            }),
        }),

        // search by title
        searchByTitle: builder.query({
            query: (title) => `videos/search/${title}`
        })
    })
})






export const { useFetchVideosQuery, useFetchSingleVideoQuery, useAddVideosMutation, useDeleteVideoMutation, useUpdateVideoMutation, useLikeVideoByAuthorMutation, useUnlikeVideoByAuthorMutation, useSearchByTitleQuery } = videosApi