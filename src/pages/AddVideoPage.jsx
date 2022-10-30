import React, { useState } from 'react';
import { useAddVideosMutation } from '../features/videos/videosApi';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const AddVideo = () => {

  const { user } = useSelector((state) => state?.auth);

  const [addVideo] = useAddVideosMutation();


  // notification
  const [showNotification, setShowNotification] = useState('')
  // notification

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






    // send notification that new video added

    // const sendNotification = () => {
    //   Notification.requestPermission().then(n => {
    //     if (n === 'granted') {
    //       const notification = new Notification(`Video with title ${title} Added Successfully`, {
    //         body: "Awesome Video Added By Adib Author",
    //         data: { videoTitle: `Video with title: ${title} Added Successfully` }
    //       })

    //       // console.log(notification.data)

    //       setShowNotification(notification.data.videoTitle)
    //     }
    //   })
    // }

    // sendNotification()

    navigate('/')

  }


  return (
    <div className="w-full max-w-xs mx-auto pt-2 pb-2 my-2">
      {showNotification}
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
          <button className="bg-blue-700 hover:bg-blue-dark text-green font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
            add video
          </button>
        </div>

      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy; Gazi Adib. All rights reserved.
      </p>
    </div>
  )
}

export default AddVideo





