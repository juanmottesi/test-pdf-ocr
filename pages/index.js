import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import { BrowserPDF417Reader } from '@zxing/browser';

const DniFront = ({ setStep, setData }) => {
  const [loading, setLoading] = useState(true);
  const [videoConstraints, setVideoConstraints] = useState({ width: 360, height: 640 });
  const webcamRef = useRef(null);
  useEffect(() => {
    setVideoConstraints({
      width: window.innerWidth,
      height: window.innerHeight,
      facingMode: { exact: "environment" }
    });
    setLoading(false);
  }, [])

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 1920, height: 1080 });
    setData(imageSrc);
    setStep('showDniFront');
  }

  return !loading && <>
    <Webcam ref={webcamRef} audio={false}  screenshotFormat="image/png" videoConstraints={videoConstraints} />
    <button onClick={capture}>Foto</button>
    </>
}

const DniFrontInfo = ({ data, setStep }) => {
  const [pdf417, setPdf417] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    const codeReader = new BrowserPDF417Reader();
    const sourceElem = document.querySelector('#image');
    console.log('????', sourceElem);
    codeReader.decodeFromImageElement(sourceElem).then((r) => { setPdf417(r)}).catch(() => setError('T_T'))
  },[]);

  return (
    <div>
      <img id="image" src={data} width="60%" height="30%" />
      { pdf417 && 
        <>
          <div>{pdf417.text}</div>
          <button onClick={() => setStep('askDniBack')}>next</button>
        </>
      }
      { error && <button onClick={() => setStep('askDniFront')}>Error!!! volver</button>}
    </div>
  )
}


const Intro = ({ setStep }) => (
  <div>
    <div>
      <h1>Toma una foto del frente de tu DNI</h1>
      <p>Buscá un lugar con buena iluminación</p>
      <p>Asegurate que se lean bien los datos</p>
      <p>Evita los reflejos y las sombras</p>
      <p>Apoya el DNI sobre fondo liso</p>
    </div>
    <button className="btn btn-primary" onClick={() => setStep('askDniFront')}>Saca la foto</button>
  </div>
);

const Home = () => {
  const [step, setStep] = useState('start')

  const [dniFront, setDniFront] = useState(null);
  const [dniBack, setDniBack] = useState(null);

  const renderElement = () => {
    switch (step) {
      case 'start': return <Intro setStep={setStep} />;
      case 'askDniFront': return <DniFront setData={setDniFront} setStep={setStep} />;
      case 'showDniFront': return <DniFrontInfo data={dniFront} setStep={setStep} />;
      case 'askDniBack': return <DniBack setData={setDniBack} setStep={setStep} />;
      case 'showDniBack': return <DniBackInfo data={dniBack} setStep={setStep} />;
      default: <div>????</div>;
    }
  }

  return (
    <div>
      {renderElement()}
    </div>
  )
}

export default Home;
