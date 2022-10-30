import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const RelatedVideoCard = ({ relatedVideo }) => {

    const { _id, title, thumbnailUrl, category, viewsCount, likes } = relatedVideo || {};

    const { user } = useSelector((state) => state?.auth);
    const { profileImage } = user || {};


    return (
        <div
            className="col-span-12 sm:col-span-6 md:col-span-3"
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
                    <Link to={`/videos/${_id}`} className="shrink-0">
                        <img
                            src={profileImage}
                            className="rounded-full h-6 w-6"
                            alt='profileimage'
                        />
                    </Link>

                    <div clas="flex flex-col">
                        <Link to={`/videos/${_id}`}>
                            <p
                                className="text-slate-900 text-sm font-semibold"
                            >
                                {title}

                            </p>
                        </Link>
                        <Link
                            className="text-gray-400 text-xs mt-2 hover:text-gray-600"
                            to={'/'}

                        >
                            {viewsCount} views {likes?.length} likes

                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedVideoCard