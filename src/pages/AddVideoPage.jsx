import React, { useState } from 'react';
import { useAddVideosMutation } from '../features/videos/videosApi';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Error from '../components/ui/Error';

const AddVideo = () => {

  const { user } = useSelector((state) => state?.auth);

  const [addVideo, { isLoading, isError, error }] = useAddVideosMutation();

  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');


  const submitHandler = (e) => {
    e.preventDefault();

    if (user !== '') {
      addVideo({
        authorId: user?._id,
        title,
        category,
        description,
        thumbnailUrl,
        videoUrl,
        likeCount: 0,
        unlikeCount: 0
      })
    } else {
      console.log('no user logged in')
    }

    navigate('/')
  }


  return (
    <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

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
            <button disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
              Add Video
            </button>
          </div>

        </div>
      </form>
      <div className="flex items-center justify-between">
        {!isLoading && error && <Error message={error} />}
      </div>
    </div>

  )
}

export default AddVideo



