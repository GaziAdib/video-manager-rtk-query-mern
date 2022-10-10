import React from 'react'

const Player = ({ videoUrl, title }) => {
  return (
    <iframe
        width="100%"
        className="aspect-video"
        src={videoUrl}
        title={title}
        frameBorder=""
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
></iframe>
  )
}

export default Player