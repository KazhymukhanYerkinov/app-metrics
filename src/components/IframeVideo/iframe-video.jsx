import React from 'react';


const IframeVideo = () => {
  return (
    <iframe
      className = 'iframe'

      src="https://www.youtube.com/embed/LTA-a5hOyks?modestbranding=1&autohide=1&showinfo=0&controls=0" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
      
    </iframe>
  )
}

export default IframeVideo;