import React from 'react'
//import VideoGridItem from './VideoGridItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
//import { fetchVideos } from '../../features/videos/videosSlice';
import Loading from '../ui/Loading';
import { useFetchVideosQuery } from '../../features/videos/videosApi';
import VideoCard from './VideoCard';

const VideoLists = () => {

    const {data: videos, isLoading, isError, error} = useFetchVideosQuery() || {};

//  const dispatch = useDispatch();

//  const { videos, isLoading, isError, error, currentPage } = useSelector(state => state.videos);
 
 // get data from filter slice

//  const { tags, search } = useSelector(state => state.filter);

    // useEffect(() => {

    //     dispatch(fetchVideos({tags, search, currentPage}));

    // },[dispatch, tags, search, currentPage]);

    let content;

    if (isLoading) content = <Loading />;

    if(!isLoading && isError) content = <div className="col-span-12">{error}</div>

    if(!isError && !isLoading && videos?.length === 0) {
        content =  <div className="col-span-12">No Videos Found!</div>;
    }

    if(!isError && !isLoading && videos?.length > 0) {
        content = videos.map((video) => (
            <VideoCard key={video._id} video={video} />
        ));
    }

    
        


  return (
    <section className="pt-12">
            <section className="pt-12">
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