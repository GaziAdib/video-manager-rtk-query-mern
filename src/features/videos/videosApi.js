import { rootApi } from "../api/rootApi"

export const videosApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all video
        fetchVideos: builder.query({
            query: () => '/videos',
        }),

        fetchPaginatedVideos: builder.query({
            query: (pageNumber) => `/videos/paginatedvideos?page=${pageNumber}`
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
                url: `/videos/${videoId}/update`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    await queryFulfilled;

                    dispatch(rootApi.util.updateQueryData('fetchSingleVideo', args?.videoId, (draft) => {
                        var video = draft;
                        Object.assign(video, {
                            _id: args?.videoId,
                            title: args?.data?.title,
                            videoSourceType: args?.data?.videoSourceType,
                            category: args?.data?.category,
                            description: args?.data?.description,
                            thumbnailUrl: args?.data?.thumbnailUrl,
                            videoUrl: args?.data?.videoUrl
                        });
                    }));

                    dispatch(
                        rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                            const video = draft?.find((videoItem) => videoItem?._id === args?.videoId);
                            video._id = args?.videoId;
                            video.title = args?.data?.title;
                            video.videoSourceType = args?.data?.videoSourceType
                            video.category = args?.data?.category;
                            video.description = args?.data?.description;
                            video.thumbnailUrl = args?.data?.thumbnailUrl;
                            video.videoUrl = args?.data?.videoUrl;
                        })
                    );


                } catch (error) {
                    console.log(error);
                }
            }
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
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    await queryFulfilled;


                    dispatch(
                        rootApi.util.updateQueryData('fetchSingleVideo', args?.videoId, (draft) => {
                            const videoData1 = draft;

                            if (videoData1?.likes?.indexOf(args?.authorId) == -1) {
                                videoData1?.likes?.push(args?.authorId);
                            }
                        })
                    );

                    dispatch(rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                        const videoData2 = draft?.find((video) => video?._id === args?.videoId)
                        if (videoData2?.likes?.indexOf(args?.authorId) == -1) {
                            videoData2?.likes?.push(args?.authorId);
                        }
                    }));



                } catch (error) {
                    console.log(error);
                }
            }

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
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchSingleVideo', args?.videoId, (draft) => {
                            const videoData1 = draft;
                            if (videoData1?.likes?.includes(args?.authorId)) {
                                videoData1?.likes?.pop(args?.authorId);
                            }

                        })
                    );

                    dispatch(rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                        const videoData2 = draft?.find((video) => video?._id === args?.videoId);
                        if (videoData2?.likes?.includes(args?.authorId)) {
                            videoData2?.likes?.pop(args?.authorId);
                        }
                    }));

                } catch (error) {
                    console.log(error);
                }
            }
        }),

        // search by title
        searchByTitle: builder.query({
            query: (title) => `videos/search/${title}`
        })
    })
})






export const { useFetchVideosQuery, useFetchPaginatedVideosQuery, useFetchSingleVideoQuery, useAddVideosMutation, useDeleteVideoMutation, useUpdateVideoMutation, useLikeVideoByAuthorMutation, useUnlikeVideoByAuthorMutation, useSearchByTitleQuery } = videosApi