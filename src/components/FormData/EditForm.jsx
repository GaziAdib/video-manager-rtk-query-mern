import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateVideoMutation } from '../../features/videos/videosApi';
import Error from '../ui/Error';

const EditForm = ({ singleVideoData }) => {
    const userLocal = localStorage.getItem('auth');
    const mainUser = JSON.parse(userLocal);

    const navigate = useNavigate();

    const {
        _id,
        title: initialTitle,
        description: initialDescription,
        category: initialCategory,
        thumbnailUrl: initialThumbnailUrl,
        videoUrl: initialVideoUrl
    } = singleVideoData || {};

    const [updateVideo, { isError, isLoading, error }] = useUpdateVideoMutation() || {};

    const [title, setTitle] = useState(initialTitle);
    const [category, setCategory] = useState(initialCategory);
    const [description, setDescription] = useState(initialDescription);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const [videoUrl, setVideoUrl] = useState(initialVideoUrl);

    const submitHandler = (e) => {
        e.preventDefault();


        if (mainUser?.user?._id === singleVideoData?.authorId) {
            updateVideo({
                videoId: _id,
                data: {
                    title,
                    category,
                    description,
                    thumbnailUrl,
                    videoUrl
                }
            })
            navigate('/');

        } else {
            alert('You Are not Author For This Video')
        }




    }



    return (
        <>
            <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Video Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Video Category
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Video description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoUrl">
                        Video URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="videoUrl"
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnailUrl">
                        Thumbnail URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="thumbnailUrl"
                        type="text"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button disabled={isLoading} className="bg-blue-700 hover:bg-blue-dark text-green font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update video
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    {!isLoading && error && <Error message={error} />}
                </div>

            </form>
        </>
    )
}

export default EditForm