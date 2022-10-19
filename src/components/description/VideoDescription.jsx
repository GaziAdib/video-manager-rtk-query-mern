import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDeleteVideoMutation } from '../../features/videos/videosApi';
import LikeUnlike from './LikeUnlike';
import moment from 'moment';

const VideoDescription = ({ video }) => {

    const { title, createdAt, description, likeCount, unlikeCount, viewsCount, _id } = video || {};

    const [deleteVideo] = useDeleteVideoMutation() || {};

    const navigate = useNavigate();



    // function to delete video

    const deleteVideoHandler = (e) => {
        deleteVideo(_id);
        navigate('/');

    }


    return (
        <div>
            <h1
                className="text-lg font-semibold tracking-tight text-slate-800"
            >
                {title}
            </h1>
            <div
                className="pb-4 flex items-center space-between border-b"
            >
                <h2
                    className="text-sm leading-[1.7142857] text-slate-600 w-24"
                >
                    {viewsCount} views
                </h2>

                <h2
                    className="text-sm leading-[1.7142857] text-slate-600 w-full"
                >
                    {moment(createdAt).format('YYYY-MM-DD')}
                </h2>


                <LikeUnlike _id={_id} likeCount={likeCount} unlikeCount={unlikeCount} />


            </div>

            <div
                className="mt-4 text-sm text-[#334155] dark:text-slate-400"
            >
                {description}
            </div>

            <button onClick={deleteVideoHandler} style={{ float: 'right' }} className="text-white rounded px-2 py-1 bg-red-600 mx-1 text-xs mt-1">
                Delete
            </button>

            <button style={{ float: 'right' }} className="text-white rounded px-2 py-1 bg-blue-600 text-xs mx-1 mt-1">
                Edit
            </button>
        </div>
    )
}

export default VideoDescription