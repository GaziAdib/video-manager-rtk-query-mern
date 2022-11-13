import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../ui/Loading';
import { useFetchVideosQuery, useSearchByTitleQuery } from '../../features/videos/videosApi';
import VideoCard from './VideoCard';

const VideoLists = () => {

    const { data: videos, isLoading, isError, error } = useFetchVideosQuery() || {};

    const { search, videoType } = useSelector((state) => state?.videos);


    const { data: searchedVideoResults } = useSearchByTitleQuery(search) || {};

    let content;

    if (isLoading) content = <Loading />;

    if (!isLoading && isError) content = <div className="col-span-12">{error}</div>

    if (!isError && !isLoading && videos?.length === 0) {
        content = <div className="col-span-12">No Videos Found!</div>;
    }

    if (!isError && !isLoading && videos?.length > 0) {

        content = search === '' && videoType === '' ?
            (
                videos?.map((video) => {
                    return <VideoCard key={video._id} video={video} />
                })
            )
            :
            (videoType !== '' ?
                (videos?.filter((item) => item?.videoSourceType?.toLowerCase() === videoType)?.map((video) => {
                    return <VideoCard key={video._id} video={video} />
                }))
                :
                (searchedVideoResults?.map((video) => {
                    return <VideoCard key={video._id} video={video} />
                }))
            )

        // content = search === '' ? (
        //     videos?.map((video) => {
        //         return <VideoCard key={video._id} video={video} />
        //     })
        // ) : (searchedVideoResults?.map((video) => {
        //     return <VideoCard key={video._id} video={video} />
        // }))

        // if (search === '' && videoType === '') {
        //     content = videos?.map((video) => {
        //         return <VideoCard key={video._id} video={video} />
        //     })
        // } else if (videoType !== '') {
        //     content = videos?.filter((item) => item?.videoSourceType.toLowerCase().includes(videoType))?.map((video) => {
        //         return <VideoCard key={video._id} video={video} />
        //     })
        // } else {
        //     content = searchedVideoResults?.map((video) => {
        //         return <VideoCard key={video._id} video={video} />
        //     })
        // }



    }



    return (
        <section className="pt-5">
            <section className="pt-5">
                <div
                    className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]"
                >

                    {content}

                </div>
            </section>
        </section>
    )
}

export default VideoLists