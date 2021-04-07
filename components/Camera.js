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
    <div className={styles.container} numberOfCamerasCallback={setNumberOfCameras}>
      <CameraPro ref={cameraRef} facingMode="environment" />
      <div className={styles.border} />
      <button className={styles.button} onClick={handleClick}>Take photo</button>
      <button hidden={numberOfCameras <= 1} className={styles.button2} onClick={() => { camera.current.switchCamera(); }} />
    </div>
  );
}
 
export default Camera;