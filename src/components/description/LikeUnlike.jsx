import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import likeImage from '../../assets/like.svg';
import unlikeImage from '../../assets/unlike.svg'
import { useLikeVideoByAuthorMutation } from '../../features/videos/videosApi';



const LikeUnlike = ({ likeCount, unlikeCount, authorId, likes }) => {

    console.log(authorId);

    const { videoId } = useParams();

    const [likeVideoByAuthor] = useLikeVideoByAuthorMutation(videoId) || {};

    const { user } = useSelector((state) => state.auth) || {};

    const likeVideoHandler = (id) => {
        console.log('like')

        likeVideoByAuthor({
            videoId: id,
            authorId: user?._id
        });

    }

    return (
        <div className="flex gap-10 w-48">
            <div className="flex gap-1">
                <div className="shrink-0">
                    <img
                        onClick={() => likeVideoHandler(videoId)}
                        className="w-5 block"
                        src={likeImage}
                        alt="Like"
                    />
                </div>
                <div
                    className="text-sm leading-[1.7142857] text-slate-600"
                >
                    {likeCount}K
                </div>
            </div>
            <div className="flex gap-1">
                <div className="shrink-0">
                    <img
                        // onClick={UnlikeIncreaseHandler}
                        className="w-5 block"
                        src={unlikeImage}
                        alt="Unlike"
                    />
                </div>
                <div
                    className="text-sm leading-[1.7142857] text-slate-600"
                >
                    {unlikeCount}K
                </div>
            </div>
        </div>

    )
}

export default LikeUnlike