import React from 'react'
import { Link } from 'react-router-dom';
import LogoAvatar from '../../assets/lws.svg';
import moment from 'moment';



const RelatedVideoCard = ({ relatedVideo }) => {

    const { _id, title, thumbnailUrl, category, viewsCount } = relatedVideo || {}


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
                        // alt={author}
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

                        >
                            {viewsCount}

                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedVideoCard