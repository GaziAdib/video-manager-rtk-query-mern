import React from 'react'

const Player = ({ videoUrl, title, autoplay }) => {
  {/* <iframe src="https://www.youtube.com/embed/[VIDEO-CODE]?autoplay=1" 
frameborder="0" style="width: 100%; height: 100%;"
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe> */}

  // $(document).ready(function() {
  //   $('.video').each(function(el){
  //     var _this = $(this);
  //     _this.on('mouseover', function(ev) {

  //       _this[0].src += "&autoplay=1";
  //       ev.preventDefault();

  //     });
  //   });
  // });

  return (
    <iframe
      width="100%"
      className="aspect-video"
      src={`${videoUrl}?autoplay=${autoplay}`}
      title={title}
      frameBorder=""
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}

export default Player