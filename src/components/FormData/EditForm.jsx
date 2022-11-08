import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateVideoMutation } from '../../features/videos/videosApi';
import Error from '../ui/Error';

const EditForm = ({ singleVideoData }) => {

    const { user } = useSelector((state) => state?.auth);

    const navigate = useNavigate();

    const {
        _id,
        title: initialTitle,
        description: initialDescription,
        category: initialCategory,
        videoSourceType: initialVideoSourceType,
        thumbnailUrl: initialThumbnailUrl,
        videoUrl: initialVideoUrl
    } = singleVideoData || {};

    const [updateVideo, { isError, isLoading, error }] = useUpdateVideoMutation() || {};

    const [title, setTitle] = useState(initialTitle);
    const [category, setCategory] = useState(initialCategory);
    const [videoSourceType, setVideoSourceType] = useState(initialVideoSourceType);
    const [description, setDescription] = useState(initialDescription);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const [videoUrl, setVideoUrl] = useState(initialVideoUrl);

    const submitHandler = (e) => {
        e.preventDefault();


        if (user?._id === singleVideoData?.authorId) {
            updateVideo({
                videoId: _id,
                data: {
                    title,
                    category,
                    videoSourceType,
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
            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Update Your Video ❤️
                </div>

                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Title" />
                        </div>

                        <div className="col-span-2 lg:col-span-2">
                            <select value={videoSourceType} onChange={(e) => setVideoSourceType(e.target.value)} className="border-solid border-green-400 border-2 p-3 md:text-xl w-full rounded-lg" required>
                                <option selected={initialVideoSourceType === 'youtube'} value="youtube">YouTube</option>
                                <option selected={initialVideoSourceType === 'facebook'} value="facebook">Facebook</option>
                            </select>
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Category" />
                        </div>

                        <div className="col-span-2">
                            <textarea cols="30" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" placeholder="Description"></textarea>
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Thumnail Url" />
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Video Url (YouTube)" />
                        </div>

                        <div className="col-span-2 text-right">
                            <button disable={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Update Video
                            </button>
                        </div>

                    </div>
                </form>
                <div className="flex items-center justify-between">
                    {!isLoading && error && <Error message={error} />}
                </div>
            </div>
        </>
    )
}

export default EditForm

{/* <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

<div className="text-3xl mb-6 text-center ">
  Add Video To Your Liking ❤️
</div>

<form onSubmit={submitHandler}>
  <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

    <div className="col-span-2 lg:col-span-1">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Title" />
    </div>

    <div className="col-span-2 lg:col-span-1">
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Category" />
    </div>

    <div className="col-span-2">
      <textarea cols="30" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" placeholder="Description"></textarea>
    </div>

    <div className="col-span-2">
      <input type="text" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Thumnail Url" />
    </div>

    <div className="col-span-2">
      <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="border-solid border-purple-400 border-2 p-3 md:text-xl w-full" required placeholder="Video Url (YouTube)" />
    </div>

    <div className="col-span-2 text-right">
      <button className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Add Video
      </button>
    </div>

  </div>
</form>
</div> */}



// <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
// <div className="mb-4">
//     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//         Video Title
//     </label>
//     <input
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="title"
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//     />
// </div>

// <div className="mb-4">
//     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//         Video Category
//     </label>
//     <input
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="category"
//         type="text"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//     />
// </div>

// <div className="mb-4">
//     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//         Video description
//     </label>
//     <textarea
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="description"
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//     />
// </div>

// <div className="mb-4">
//     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoUrl">
//         Video URL
//     </label>
//     <input
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="videoUrl"
//         type="text"
//         value={videoUrl}
//         onChange={(e) => setVideoUrl(e.target.value)}
//     />
// </div>

// <div className="mb-4">
//     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnailUrl">
//         Thumbnail URL
//     </label>
//     <input
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="thumbnailUrl"
//         type="text"
//         value={thumbnailUrl}
//         onChange={(e) => setThumbnailUrl(e.target.value)}
//     />
// </div>

// <div className="flex items-center justify-between">
//     <button disabled={isLoading} className="bg-blue-700 hover:bg-blue-dark text-green font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
//         Update video
//     </button>
// </div>
// <div className="flex items-center justify-between">
//     {!isLoading && error && <Error message={error} />}
// </div>

// </form>