import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearVideoType, videoTypeSelected } from '../../features/videos/videoSlice';

const VideoSourceType = () => {

    const dispatch = useDispatch();

    const { search, videoType } = useSelector((state) => state?.videos);

    const videoTypeFacebook = () => {
        dispatch(videoTypeSelected('facebook'))
    }

    const videoTypeYouTube = () => {
        dispatch(videoTypeSelected('youtube'))
    }

    const onClearVideoType = () => {
        dispatch(clearVideoType())
    }

    return (
        <>

            <div className='flex justify-center mt-4 pb-1 pt-1 pb-1 mb-2 content-center inline-block align-baseline'>

                <button className='mx-4 my-1 px-3 py-1 rounded bg-gray-600 text-white'>Filter By:</button>

                <button onClick={videoTypeYouTube} className={videoType === 'youtube' ? `mx-4  px-2 py-1 rounded-full bg-red-600 text-white border-4 border-red-200` : `mx-4 my-1 px-2 py-1 rounded-full bg-red-600 text-white`}>YouTube</button>

                <button onClick={videoTypeFacebook} className={videoType === 'facebook' ? `mx-4  px-2 py-1 rounded-full bg-blue-600 text-white border-4 border-blue-200` : `mx-4 my-1 px-2 py-1 rounded-full bg-blue-600 text-white`}>Facebook</button>

                <button onClick={onClearVideoType} className='mx-4 my-1 px-2 py-1 rounded-full bg-slate-600 text-white'>Clear</button>
            </div>


        </>
    )
}

export default VideoSourceType