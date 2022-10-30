import React from 'react'
import { useParams } from 'react-router-dom'
import AddCommentForm from '../components/commentSection/AddCommentForm';
import CommentLists from '../components/commentSection/CommentLists';
import VideoPlayer from '../components/description/Player'
import VideoDescription from '../components/description/VideoDescription'
import RelatedVideos from '../components/relatedVideos/RelatedVideos';
import Loading from '../components/ui/Loading';
import { useFetchSingleVideoQuery } from '../features/videos/videosApi';


const VideoDetailPage = () => {

    const { videoId } = useParams();


    const { data: video, isError, isLoading, error } = useFetchSingleVideoQuery(videoId) || {};

    const { _id, videoUrl, category, title, authorId } = video || {};

    // decide what to render

    let content = null;

    if (isLoading) content = <Loading />;

    if (!isLoading && isError) content = <div className="col-span-12">{error}</div>

    if (!isError && !isLoading && !video?._id) {
        content = <div className="col-span-12">No Video Found!</div>;
    }


    if (!isLoading && !isError && video?._id) {

        content = <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">

                <VideoPlayer videoUrl={videoUrl} title={title} />

                <VideoDescription video={video} />

                <AddCommentForm authorId={authorId} id={_id} />

                <CommentLists id={_id} />

            </div>

            <RelatedVideos currentVideoId={_id} category={category} />

        </div>
    }


    return (

        <section className="pt-6 pb-20">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">


                {content}

            </div>
        </section>


    )
}

export default VideoDetailPage