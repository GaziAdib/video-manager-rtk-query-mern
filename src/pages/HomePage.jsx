import React from 'react'
import { useFetchVideosQuery } from '../features/videos/videosApi'

const HomePage = () => {

  const {data: videos } = useFetchVideosQuery() || {};

  return (
    <>
      <div>HomePage</div>

      {videos?.map((video) => {
        return <div>
            <h2>{video.title}</h2>
            <h4>{video.category}</h4>
            <hr />
            <p>{video.description}</p>
            <br />
            <span><img src={video.thumbnailUrl} height="150px" width="150px" alt="image" /></span>
            <a href={video.videoUrl} target='_blank'>Link Video</a>
        </div>
      })}
    </>
    
  )
}

export default HomePage