import React from 'react'
//import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
//import { getVideosByAuthor } from '../../features/videos/videosSlice';
import LogoAvatar from '../../assets/lws.svg';
import { useAddWishlistMutation, useFetchAllWishlistsQuery } from '../../features/wishlists/wishlistsApi';
import moment from 'moment';




const VideoCard = ({ video }) => {

    const { _id, thumbnailUrl, title, likeCount, category, author, viewsCount, createdAt } = video;

    const authUser = localStorage.getItem('auth');

    const mainUser = JSON.parse(authUser);


    //const { user } = useSelector((state) => state?.auth) || {};
    const userId = mainUser?.user?._id;

    // const { data: myWishlists, isError, isLoading, error } = useFetchWishlistsQuery(userId) || {};

    const { data: allWishlists, isError, isLoading, error } = useFetchAllWishlistsQuery() || {};


    const [addWishlist] = useAddWishlistMutation() || {};


    const addToWishlist = (videoData) => {


        console.log('added to wishlist');

        const allWishLists = allWishlists;
        console.log('all wishlists', allWishLists);

        // const existedData = allWishlists?.find((item) => item?.video_id === videoData?._id);

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

        // if (existedData?.authorName !== mainUser?.user?.username) {
        //     console.log('matched');
        //     if (!existedData) {
        //         addWishlist({
        //             video_id: videoData?._id,
        //             videoOwnerId: videoData?.authorId,
        //             authorName: mainUser?.user?.username,
        //             title: videoData?.title,
        //             category: videoData?.category,
        //             thumbnailUrl: videoData?.thumbnailUrl
        //         })
        //     } else {
        //         alert('AuthorName is  matched!')
        //     }
        // } else {
        //     alert('already added to wishlist!')
        // }


    }



    return (
        <div
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

                        <button onClick={() => addToWishlist(video)} className="text-green-600 font-bold rounded-lg text-xs mt-1">
                            Add Wishlist
                        </button>

                        {/* <button style={{ float: 'right'}} className="text-white rounded px-1 py-1 bg-red-600 mx-1 text-xs mt-1">
                    Delete
                </button>

                <button style={{ float: 'right'}} className="text-white rounded px-1 py-1 bg-red-600 text-xs mx-1 mt-1">
                    Edit
                </button>   */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard