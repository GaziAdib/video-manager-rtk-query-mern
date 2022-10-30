import React from 'react'
import { Link } from 'react-router-dom';
import LogoAvatar from '../../assets/lws.svg';
import { useAddWishlistMutation, useFetchAllWishlistsQuery } from '../../features/wishlists/wishlistsApi';
import moment from 'moment';
import { useState } from 'react';
import Player from '../description/Player';


const VideoCard = ({ video }) => {

    // hover effect state
    const [hovered, setHovered] = useState(false);
    /// end test

    const { _id, thumbnailUrl, title, likeCount, likes, category, author, viewsCount, videoUrl, createdAt } = video;

    const authUser = localStorage.getItem('auth');

    const mainUser = JSON.parse(authUser);


    //const { user } = useSelector((state) => state?.auth) || {};
    const userId = mainUser?.user?._id;

    // const { data: myWishlists, isError, isLoading, error } = useFetchWishlistsQuery(userId) || {};

    const { data: allWishlists, isError, isLoading, error } = useFetchAllWishlistsQuery() || {};


    const [addWishlist] = useAddWishlistMutation() || {};

    // disables button function
    const filterDataForDisabled = (arrayWishlists, currentVideo, currentUser) => {
        const result = arrayWishlists?.find((item) => item?.video_id === currentVideo?._id && item?.authorName === currentUser?.username)
        return result;
    }

    const addToWishlist = (videoData) => {


        //const existedData = allWishlists?.find((item) => item?.video_id === videoData?._id);

        // const sameUser = existedData?.authorName === mainUser?.user?.username

        // console.log(sameUser);

        if (videoData) {
            addWishlist({
                video_id: videoData?._id,
                videoOwnerId: videoData?.authorId,
                authorName: mainUser?.user?.username,
                title: videoData?.title,
                category: videoData?.category,
                thumbnailUrl: videoData?.thumbnailUrl
            })
        }
        else {
            alert('already added to wishlist!')
        }
    }

    // on mouse hover function

    const onMouseHoverHandler = (e) => {
        setHovered(true);
    }

    const onMouseHoverRemove = (e) => {
        setHovered(false);
    }


    return (
        <div
            className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
        >
            <div className="w-full flex flex-col">
                <div onMouseOver={onMouseHoverHandler} onMouseLeave={onMouseHoverRemove} className="relative">
                    <Link to={`videos/${_id}`}>
                        {hovered ? (
                            <Player autoplay={hovered ? '1' : '0'} videoUrl={videoUrl} title={title} />
                        ) : (
                            <img
                                id='videoThumnail'
                                src={thumbnailUrl}
                                className="w-full h-auto"
                                alt={title}
                            />
                        )}
                    </Link>

                    <p
                        className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py"
                    >
                        {category}
                    </p>
                </div>

                <div className="flex flex-row mt-2 gap-2">
                    <Link to={`videos/${_id}`} className="shrink-0">
                        <img
                            src={mainUser?.user?.profileImage}
                            className="rounded-full h-6 w-6"
                            alt={author}
                        />
                    </Link>

                    <div clas="flex flex-col">
                        <Link to={`videos/${_id}`}>
                            <p
                                className="text-slate-900 text-sm font-semibold"
                            >
                                {title}

                            </p>
                        </Link>
                        <Link
                            className="text-gray-400 text-xs mt-2 hover:text-gray-600"
                            to={'/'}
                        // onClick={(e) => filterByAuthorHandler(author)}

                        >
                            {author}

                        </Link>
                        <p className="text-gray-400 text-xs mt-1">
                            {likes?.length} likes . {viewsCount} views  {moment(createdAt).format('YYYY-MM-DD')}
                        </p>

                        <button onClick={() => addToWishlist(video)} disabled={filterDataForDisabled(allWishlists, video, mainUser?.user)} className="text-green-800 bg-green-200 px-1 py-0.5 font-medium rounded-lg text-xs mt-1 disabled:opacity-50">
                            Add Wishlist
                        </button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard


{/* <div
            className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]"
        >
            <div className="w-full flex flex-col">
                <div className="relative">
                    <Link to={`videos/${_id}`}>
                        <img
                            src={thumbnailUrl}
                            className="w-full h-auto"
                            alt={title}
                        />
                    </Link>

                    <p
                        className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py"
                    >
                        {category}
                    </p>
                </div>

                <div className="flex flex-row mt-2 gap-2">
                    <Link to={`videos/${_id}`} className="shrink-0">
                        <img
                            src={LogoAvatar}
                            className="rounded-full h-6 w-6"
                            alt={author}
                        />
                    </Link>

                    <div clas="flex flex-col">
                        <Link to={`videos/${_id}`}>
                            <p
                                className="text-slate-900 text-sm font-semibold"
                            >
                                {title}

                            </p>
                        </Link>
                        <Link
                            className="text-gray-400 text-xs mt-2 hover:text-gray-600"
                            to={'/'}
                        // onClick={(e) => filterByAuthorHandler(author)}

                        >
                            {author}

                        </Link>
                        <p className="text-gray-400 text-xs mt-1">
                            {likeCount} likes . {viewsCount} views  {moment(createdAt).format('YYYY-MM-DD')}
                        </p>



                        <button onClick={() => addToWishlist(video)} disabled={filterDataForDisabled(allWishlists, video, mainUser?.user)} className="text-green-800 bg-green-200 px-1 py-0.5 font-medium rounded-lg text-xs mt-1 disabled:opacity-50">
                            Add Wishlist
                        </button>


                    </div>
                </div>
            </div>
        </div> */}