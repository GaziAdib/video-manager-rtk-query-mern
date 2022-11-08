import React from 'react'
import VideoLists from '../components/grid/VideoLists'
import VideoSourceType from '../components/videoTypeFilter/VideoSourceType'


const HomePage = () => {



  return (
    <>
      <VideoSourceType />
      <hr style={{ width: '50%', margin: 'auto' }} />
      <VideoLists />
    </>

  )
}

export default HomePage