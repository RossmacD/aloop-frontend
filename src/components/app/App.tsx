import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Button, Flex, Debug } from '@fluentui/react-northstar'
import { IconContext } from 'react-icons'
import { ws, client, room, makeConnection, localConnection } from '../../utils/sockets/socket';
import Router from '../../routes/Router'

function App() {


  return (
    <BrowserRouter>
      <IconContext.Provider value={{ size: '1.25rem' }}>
        <Flex column>
          {/* <div style={{ position: "relative" }}>
            <video ref={videoRef} onCanPlay={canPlay} id="player" autoPlay playsInline muted />
            <p style={{ position: "absolute", color: 'white', top: 10, left: 10 }}>Your Name: {client}</p>
          </div>
          <div style={{ position: "relative" }}>
            <video ref={incomingVidRef} playsInline autoPlay ></video>
            <p style={{ position: "absolute", color: 'white', top: 10, left: 10 }}>Caller Name: {'caller'}</p>
          </div> */}
          {/* <Button content="Connect to websocket" primary onClick={() => signalConnect()} disabled={inCall} /> */}
          {/* <Nav></Nav> */}
          <Router />
          <Debug />
        </Flex>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
