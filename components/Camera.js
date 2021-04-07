import React, { useRef, useState } from "react";
import { Camera as CameraPro } from "react-camera-pro";
import styles from '../styles/Home.module.css';

const Camera = ({ setData, setStep, nextStep }) => {
  const cameraRef = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  const handleClick = () => {
    setData(cameraRef.current.takePhoto());
    setStep(nextStep);
  }

  return (
    <div className={styles.container} >
      <CameraPro ref={cameraRef} facingMode="environment" numberOfCamerasCallback={setNumberOfCameras} />
      <div className={styles.border} />
      <button className={styles.button} onClick={handleClick}>Take photo</button>
      {!(numberOfCameras <= 1) && <button className={styles.button2} onClick={() => { camera.current.switchCamera(); }}>switch</button>}
    </div>
  );
}
 
export default Camera;