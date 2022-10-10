import React, { useState } from 'react';
import { useAddVideosMutation } from '../features/videos/videosApi';

const AddVideo = () => {

  const [addVideo] = useAddVideosMutation();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
 

  const submitHandler = (e) => {
    e.preventDefault();

    addVideo({
      title,
      category,
      description,
      thumbnailUrl,
      videoUrl,
      likeCount: 0,
      unlikeCount: 0
    })

  }
  

  return (
  <div className="w-full max-w-xs mx-auto pt-2 pb-2 my-2">
  <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
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
      <label className="block text-gray-700 text-sm font-bold mb-2" for="category">
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
      <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
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
      <label className="block text-gray-700 text-sm font-bold mb-2" for="videoUrl">
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
      <label className="block text-gray-700 text-sm font-bold mb-2" for="thumbnailUrl">
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
                                        <button className="bg-blue hover:bg-blue-dark text-green font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
                                          add video
                                        </button>
                                      </div>
    
  
    
    
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy; Gazi Adib. All rights reserved.
  </p>
</div>
  )
}

export default AddVideo

{/* <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      <p class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div> */}





{/* <div>
      <h1>Add Video</h1>
      <div style={{ display: 'flex' }}>
        <form onSubmit={submitHandler}>
          <label>Title</label>
          <br />
          <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Category</label>
          <br />
          <input type="text" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} />

          <label>Description</label>
          <br />
          <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Thumbnail URL</label>
          <br />
          <input type="text" placeholder="thumbnail" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />

          <label>Video URL</label>
          <br />
          <input type="text" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />

          <button type='submit'>submit video</button>
        </form>
      </div>
    </div> */}