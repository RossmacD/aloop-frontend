import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Button, Flex, Debug } from '@fluentui/react-northstar'
import { IconContext } from 'react-icons'
import { ws, client, room, makeConnection, localConnection } from '../../utils/sockets/socket';


function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const incomingVidRef = useRef<HTMLVideoElement>(null);
  const [streamOut, setStream] = useState<MediaStream>()
  const [inCall, setInCall] = useState(false)

  const signalConnect = () => {
    setInCall(true)
    makeConnection()
  }

  const pipeErr = (err: Error) => { throw err }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then((stream) => {
        if (videoRef?.current) {
          videoRef.current.srcObject = stream
          localConnection.ontrack = gotRemoteStream;
          stream.getTracks().forEach(track => localConnection.addTrack(track, stream));
          setStream(stream)
          // makeVideoCall(stream)
        }
      }).catch((err) => console.error(`Error getting media device`, err));
  }, [videoRef])

  const canPlay = () => {
    if (videoRef?.current) { videoRef.current.play() }
  }

  const gotRemoteStream = (e: any) => {
    if (incomingVidRef?.current && incomingVidRef?.current?.srcObject !== e.streams[0]) {
      incomingVidRef.current.srcObject = e.streams[0];
      // console.log('pc2 received remote stream');
    }
  }


  const makeVideoCall = (stream: MediaStream) => {
    const localConnection = new RTCPeerConnection();
    const remoteConnection = new RTCPeerConnection();

    // Add Ice Candidate when created
    localConnection.onicecandidate = (iceEvent) => {
      // console.log('LocalConnection : Adding Candidate', iceEvent.candidate)
      if (iceEvent.candidate) remoteConnection.addIceCandidate(iceEvent.candidate)
    }
    // localConnection.oniceconnectionstatechange = (stateChangeEvent) => console.log('localConnection state Change ', stateChangeEvent)

    // Add Ice Candidate when created
    remoteConnection.onicecandidate = (iceEvent) => {
      // console.log('RemoteConnection : Adding Candidate', iceEvent.candidate)
      if (iceEvent.candidate) localConnection.addIceCandidate(iceEvent.candidate)
    }
    // remoteConnection.oniceconnectionstatechange = (stateChangeEvent) => console.log('remote state Change', stateChangeEvent)

    remoteConnection.addEventListener('track', gotRemoteStream);

    stream.getTracks().forEach(track => localConnection.addTrack(track, stream));
    console.log('Added stream to local');

    // Create an offer to connect (Sets up the terms for the call)
    localConnection.createOffer({ offerToReceiveVideo: true }).then(async (offer) => {
      // console.log(`Offer from local\n${offer.sdp}`);
      // Set the description of tye call on the local PC
      // console.log('local setLocalDescription start');
      await localConnection.setLocalDescription(offer).catch(pipeErr)
      // console.log(`remote setRemoteDescription start`);
      // Set the description of the call on the remote PC
      await remoteConnection.setRemoteDescription(offer).catch(pipeErr)
      // Remote PC answers local
      console.log("creating answer")
      const answer = await remoteConnection.createAnswer().catch(pipeErr)
      // console.log(`Answer from remote:\n${offer.sdp}`);
      // Set the description of the answer to the call remote
      // console.log('remote setLocalDescription start');
      await remoteConnection.setLocalDescription(answer).catch(pipeErr)
      // Set the description of the answer to the call on local
      // console.log('local setRemoteDescription start');
      await localConnection.setRemoteDescription(answer).catch(pipeErr)
    })
      .catch(err => console.error(err))
  }

  return (
    <BrowserRouter>
      <IconContext.Provider value={{ size: '1.25rem' }}>
        <Flex column>
          {/* <p>Hi</p> */}
          <video ref={videoRef} onCanPlay={canPlay} id="player" autoPlay playsInline muted />
          <video ref={incomingVidRef} playsInline autoPlay ></video>
          <Button content="Connect to websocket" primary onClick={() => signalConnect()} disabled={inCall} />
          {/* <Nav></Nav> */}
          {/* <Router /> */}
          <Debug />
        </Flex>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
