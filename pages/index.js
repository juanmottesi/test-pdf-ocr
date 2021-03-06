import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import { BrowserPDF417Reader } from '@zxing/browser';
import Tesseract from 'tesseract.js';
import styles from '../styles/Home.module.css';
import Camera from '../components/Camera';


const DniReader = ({ setStep, setData, nextStep }) => {
  const [loading, setLoading] = useState(true);
  const [videoConstraints, setVideoConstraints] = useState({ width: 320, height: 564 });

  const webcamRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(mediaDevices => mediaDevices.filter(({ kind }) => kind === 'videoinput'))
      .then(videoDevices => {
        if (videoDevices.length > 1) {
          setVideoConstraints({ width: window.innerWidth, height: window.innerHeight, facingMode: { exact: "environment" } });
        } else {
          setVideoConstraints({ width: window.innerWidth, height: window.innerHeight });
        }
        setLoading(false)
      })
  }, [])

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({ width: videoConstraints.width, height: videoConstraints.height });
    setData(imageSrc);
    setStep(nextStep);
  }

  return !loading && <div className={styles.cameraContainer}>
    <Webcam ref={webcamRef} audio={false} width={videoConstraints.width} height={videoConstraints.height} screenshotFormat="image/png" videoConstraints={videoConstraints} screenshotQuality={1} />
    <button style={{ position: 'absolute', bottom: 40, right: '50%' }} onClick={capture}>Foto</button>
  </div>
}

const DniFrontInfo = ({ data, setStep }) => {
  const [pdf417, setPdf417] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    const codeReader = new BrowserPDF417Reader();
    const sourceElem = document.querySelector('#image');
    codeReader.decodeFromImageElement(sourceElem).then((r) => { setPdf417(r) }).catch((e) => setError('T_T',e ))
  }, []);

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

const DniBackInfo = ({ data, setStep }) => {
  const [ocr, setOcr] = useState('');
  const [error, setError] = useState(null);

  useEffect(async () => {
    const worker = Tesseract.createWorker({
      logger: m => console.log(m)
    });

    const exampleImage = document.querySelector('#image');

    async function work() {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      let result = await worker.detect(exampleImage);
      console.log('???', result.data);

      result = await worker.recognize(exampleImage);
      console.log('???', result.data);

      setOcr(result.data.text);

      await worker.terminate();
    }

    work();

  }, []);

  return (
    <div>
      <img id="image" src={data} width="60%" height="30%" />
      { ocr &&
        <>
          <div>{ocr.text}</div>
          <button onClick={() => setStep('end')}>next</button>
        </>
      }
      { error && <button onClick={() => setStep('askDniBack')}>Error!!! volver</button>}
    </div>
  )
}

const Intro = ({ setStep }) => (
  <div>
    <div>
      <h1>Toma una foto del frente de tu DNI</h1>
      <p>Busc?? un lugar con buena iluminaci??n</p>
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
      case 'askDniFront': return <Camera setData={setDniFront} setStep={setStep} nextStep="showDniFront" />;
      case 'showDniFront': return <DniFrontInfo data={dniFront} setStep={setStep} />;
      case 'askDniBack': return <Camera setData={setDniBack} setStep={setStep} nextStep="showDniBack" />;
      case 'showDniBack': return <DniBackInfo data={dniBack} setStep={setStep} />;
      default: <div>FIN</div>;
    }
  }

  return (
    <div>
      {renderElement()}
    </div>
  )
}

export default Home;
