import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import likeImage from '../../assets/like.svg';
import unlikeImage from '../../assets/unlike.svg'
import { useLikeVideoByAuthorMutation, useUnlikeVideoByAuthorMutation } from '../../features/videos/videosApi';



const LikeUnlike = ({ likes, authorId }) => {


    const { videoId } = useParams();

    const [likeVideoByAuthor] = useLikeVideoByAuthorMutation(videoId) || {};
    const [unlikeVideoByAuthor] = useUnlikeVideoByAuthorMutation(videoId) || {};

    const { user } = useSelector((state) => state?.auth) || {};


    // like video function
    const likeVideoHandler = (id) => {
        likeVideoByAuthor({
            videoId: id,
            authorId: user?._id
        });
    }

    // unlike video function
    const unlikeVideoHandler = (id) => {
        unlikeVideoByAuthor({
            videoId: id,
            authorId: user?._id
        });
    }

    return (
        <div className="flex gap-6 w-48 ml-auto mt-1">
            <div className="flex gap-1">
                <div className={likes?.includes(user?._id) ? `w-7 block cursor-pointer bg-green-200 px-1 py-1 rounded-full` : ``}>
                    <img
                        onClick={() => likeVideoHandler(videoId)}
                        className={`w-5 block cursor-pointer`}
                        src={likeImage}
                        alt="Like"
                    />
                </div>
                <div
                    className={likes?.includes(user?._id) ? `text-sm leading-[1.7142857] text-green-800` : `text-sm leading-[1.7142857] text-slate-600`}
                >
                    {likes?.includes(user?._id) ? 'liked' : 'like'}
                </div>
            </div>
            <div className="flex gap-1">
                <div className="shrink-0">
                    <img
                        onClick={() => unlikeVideoHandler(videoId)}
                        className="w-5 block cursor-pointer"
                        src={unlikeImage}
                        alt="Unlike"
                    />
                </div>
                <div
                    className="text-sm leading-[1.7142857] text-slate-600"
                >
                    unlike
                </div>
            </div>
        </div>

    )
}

export default LikeUnlike