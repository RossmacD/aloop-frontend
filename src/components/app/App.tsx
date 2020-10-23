import React, { useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Button, Flex, Debug } from '@fluentui/react-northstar'
import { IconContext } from 'react-icons'


function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("aaaaa")
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then((stream) => {
        if (videoRef?.current) {
          videoRef.current.srcObject = stream
        }
      }).catch((err) => console.error(err));
  }, [videoRef])

  const canPlay = () => {
    if (videoRef?.current) { videoRef.current.play() }
  }

  return (
    <BrowserRouter>
      <IconContext.Provider value={{ size: '1.25rem' }}>
        <Flex >
          <p>Hi</p>
          <video ref={videoRef} onCanPlay={canPlay} id="player" autoPlay />
          {/* <Nav></Nav> */}
          {/* <Router /> */}
          <Debug />
        </Flex>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
