import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const ReactWebcam = () => {
  const [videoConstraints, setVideoConstraints] = useState(undefined);
  const contianerRef = useRef(null);

  useEffect(() => {
    console.log("???", contianerRef.current);
    setVideoConstraints({
      height: contianerRef.current.clientHeight,
      width: contianerRef.current.clientWidth,
      facingMode: "environment",
    });
  }, [contianerRef]);

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = "Image.jpeg";
    a.click();
  }, [webcamRef]);

  return (
    <div id="1" ref={contianerRef} style={{ width: "100vw", height: "100vh" }}>
      {videoConstraints && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
          />
          <button
            style={{
              position: "absolute",
              padding: 10,
              bottom: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={capture}
          >
            Capture photo
          </button>
        </>
      )}
    </div>
  );
};

export default ReactWebcam;
