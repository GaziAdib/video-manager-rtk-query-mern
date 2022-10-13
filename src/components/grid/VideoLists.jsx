import React from 'react'
//import VideoGridItem from './VideoGridItem'
import { useSelector } from 'react-redux'
//import { fetchVideos } from '../../features/videos/videosSlice';
import Loading from '../ui/Loading';
import { useFetchVideosQuery, useSearchByTitleQuery } from '../../features/videos/videosApi';
import VideoCard from './VideoCard';

const VideoLists = () => {

    const {data: videos, isLoading, isError, error} = useFetchVideosQuery() || {};

    const { search } = useSelector((state) => state.videos);

    const {data: searchedVideoResults} = useSearchByTitleQuery(search)

    // console.log(videos);

    let content;

    if (isLoading) content = <Loading />;

    if(!isLoading && isError) content = <div className="col-span-12">{error}</div>

    if(!isError && !isLoading && videos?.length === 0) {
        content =  <div className="col-span-12">No Videos Found!</div>;
    }

    if(!isError && !isLoading && videos?.length > 0) {

        content = search == '' ? (
            videos?.map((video) => {
                return <VideoCard key={video._id} video={video} />
            })
        ) :  (searchedVideoResults?.map((video) => {
            return <VideoCard key={video._id} video={video} />
        }))
           
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