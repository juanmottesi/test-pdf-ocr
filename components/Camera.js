import React, { useRef } from "react";
import { Camera as CameraPro } from "react-camera-pro";
import styles from '../styles/Home.module.css';

const Camera = ({ setData, setStep, nextStep }) => {
  const cameraRef = useRef(null);

  const handleClick = () => {
    setData(cameraRef.current.takePhoto());
    setStep(nextStep);
  }

  return (
    <div className={styles.container}>
      <CameraPro ref={cameraRef} facingMode="environment" />
      <div className={styles.border} />
      <button className={styles.button} onClick={handleClick}>Take photo</button>
    </div>
  );
}
 
export default Camera;