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
    <div>
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
    </div>
  )
}

export default AddVideo