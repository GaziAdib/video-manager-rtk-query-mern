import React from 'react'
import { useParams } from 'react-router-dom'

import likeImage from '../../assets/like.svg';
import unlikeImage from '../../assets/unlike.svg'
import { useIncreaseLikeCountMutation } from '../../features/videos/videosApi';
// import { updateVideoLikeCount, updateVideoUnLikeCount } from '../../features/video/videoSlice'


const LikeUnlike = ({ likeCount, unlikeCount }) => {

    const { videoId } = useParams();

    const [increaseLikeCount] = useIncreaseLikeCountMutation() || {};

    // var dispatch = useDispatch();

    const likeIncreaseHandler = () => {

        increaseLikeCount({videoId: videoId, likeCount: likeCount + 1})

        //dispatch(updateVideoLikeCount({id: videoId, likes: likes + 1}))
    
    }

    // const UnlikeIncreaseHandler = () => {
    //     dispatch(updateVideoUnLikeCount({id: videoId, unlikes: unlikes + 1}))
    // }


  return (
    <div className="flex gap-10 w-48">
    <div className="flex gap-1">
        <div className="shrink-0">
            <img
                onClick={likeIncreaseHandler}
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