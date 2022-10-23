import React from 'react'
import { useFetchVideosQuery } from '../../features/videos/videosApi'
import Loading from '../ui/Loading';
import RelatedVideoCard from './RelatedVideoCard';

const RelatedVideos = ({ currentVideoId, category }) => {

    const { data: allVideoLists, isLoading, isError, error } = useFetchVideosQuery() || {};

    const matchedData = allVideoLists?.filter((relatedVideo) => relatedVideo?.category?.toLowerCase().includes(category?.toLowerCase()));

    let content;

    if (isLoading) content = <Loading />;

    if (!isLoading && isError) content = <div className="col-span-12">{error}</div>

    if (!isError && !isLoading && matchedData?.length === 0) {
        content = <div className="col-span-12">No Videos Found!</div>;
    }

    // if (matchedData?.length > 0 &&
    //     matchedData?.map((item) => {

    //         return content = <RelatedVideoCard relatedVideo={item} key={item?._id} />

    //     })
    // )


    return (
        <div>
            <h2>RelatedVideos category -{category} | currentId: {currentVideoId}</h2>

            {matchedData?.slice(0, 10).filter((data) => data?._id !== currentVideoId).map((item) => {
                return <RelatedVideoCard relatedVideo={item} currentVideoId={currentVideoId} />
            })}


        </div>
    )
}

export default RelatedVideos