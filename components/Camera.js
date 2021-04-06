import React, { useEffect } from 'react';

const Camera = () => {

  useEffect(() => {
    window.navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
      const video = document.getElementById('video');
      video.srcObject = stream;
      })
      .catch(() => console.log('TODO: what the fack men!!'))
  }, []);

  return (
    <div>
      <video id="video" width="100%" height="100%" autoPlay>Loading...</video>
      <button>Take foto</button>
    </div>
  );
}

export default Camera;