import React from 'react'


import ReactPlayer from 'react-player';

const Player = ({ videoUrl, title, autoplay }) => {

  return (
    // <iframe
    //   width="100%"
    //   className="aspect-video"
    //   src={`${videoUrl}?autoplay=${autoplay}`}
    //   title={title}
    //   frameBorder=""
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //   allowFullScreen
    // ></iframe>


    <ReactPlayer
      url={videoUrl}
      style={{ width: '100%', aspectRatio: 16 / 9 }}
      controls
      width="100%"
      height="40%"
      pip={true}
      volume={true}
      playing={autoplay}

    />


  )
}

export default Player