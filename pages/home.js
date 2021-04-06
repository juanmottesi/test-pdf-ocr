import React from 'react';
import Camera from 'react-html5-camera-photo';

const Home = () => {
  return (
    <Camera idealFacingMode="environment" isFullscreen={true} />
  )
}

export default Home;
