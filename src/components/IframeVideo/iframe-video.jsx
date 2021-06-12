import React from 'react';


const IframeVideo = () => {
  return (
    <iframe
      className = 'iframe'
      src="https://www.youtube.com/embed/LTA-a5hOyks?autoplay=1&controls=0" 
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen> 
    </iframe>
  )
}

export default IframeVideo;