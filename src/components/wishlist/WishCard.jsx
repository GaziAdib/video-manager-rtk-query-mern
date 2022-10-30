import React from 'react';
import LogoAvatar from '../../assets/lws.svg';
import { Link } from 'react-router-dom';
import { useDeleteWishlistMutation } from '../../features/wishlists/wishlistsApi';

const WishCard = ({ wishlist }) => {

    const { _id, authorName, title, category, thumbnailUrl, video_id } = wishlist || {};

    const localUser = localStorage.getItem('auth');
    const mainUser = JSON.parse(localUser);
    const { profileImage } = mainUser?.user;


    const [deleteWishlist, { isError, isLoading, error }] = useDeleteWishlistMutation() || {};

    // delete wishlist item
    const handleDelete = (id) => {
        deleteWishlist(id);
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
                    <a href={`videos/${video_id}`} className="shrink-0">
                        <img
                            src={profileImage}
                            className="rounded-full h-6 w-6"
                            alt={authorName}
                        />
                    </a>

                    <div clas="flex flex-col">
                        <Link to={`/videos/${video_id}`}>
                            <p
                                className="text-slate-900 text-sm font-semibold"
                            >
                                {title}

                            </p>
                        </Link>

                        <p className="text-gray-400 text-xs mt-1">
                            author: {authorName} 🔥
                        </p>

                        <button onClick={() => handleDelete(_id)} className="text-red-800 bg-red-200 px-2 py-1 font-medium rounded-lg text-xs mt-1 disabled:opacity-50">
                            Delete
                        </button>


                    </div>
                </div>
            </div>
        </div>

    )
}

export default WishCard


