import { Button } from '@fluentui/react-northstar'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { SocketContext } from '../app/SocketProvider';
import { VideoPanel } from './VideoPanel';
// import { makeConnection, localConnection, client } from '../../utils/sockets/socket';!!!

interface Props {
    selectedRoom: String | undefined
}

export const VideoCall: React.FC<Props> = ({ children, selectedRoom }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const incomingVidRef = useRef<HTMLVideoElement>(null);
    // const [streamOut, setStream] = useState<MediaStream>()
    const [inCall, setInCall] = useState(false)
    const [callMessage, setCallMessage] = useState<string>("")

    const socketContext = useContext(SocketContext)


    const joinRoom = (room: String) => {
        console.log("Joining Call")
        setInCall(true)
        if (socketContext?.socket?.current?.makeConnection(room)) {
            console.log("Connected!")
        } else {
            console.log("No it broken", socketContext)
        }



        // if (makeConnection()) {

        // } else {
        //     setInCall(false)
        //     console.log("Could not connect")
        //     setCallMessage("Could not connect")
        // }
    }

    const pipeErr = (err: Error) => { throw err }

    useEffect(() => {
        if (!navigator.mediaDevices?.getUserMedia({ audio: false, video: true })
            .then((stream) => {
                if (videoRef?.current) {
                    videoRef.current.srcObject = stream
                    // socketContext?.socket?.current?.localConnection.ontrack = gotRemoteStream;
                    socketContext?.socket?.current?.setTracks(gotRemoteStream, stream)
                    // stream.getTracks().forEach(track => localConnection.addTrack(track, stream));
                    //! setStream(stream)
                    // !makeVideoCall(stream)
                }
            }).catch((err) => console.error(`Error getting media device`, err))) {
            // There are no media devices
            setCallMessage("No media devices found, is your camera / microphone connected?")
        };
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


    // const makeVideoCall = (stream: MediaStream) => {
    //     const localConnection = new RTCPeerConnection();
    //     const remoteConnection = new RTCPeerConnection();

    //     // Add Ice Candidate when created
    //     localConnection.onicecandidate = (iceEvent) => {
    //         // console.log('LocalConnection : Adding Candidate', iceEvent.candidate)
    //         if (iceEvent.candidate) remoteConnection.addIceCandidate(iceEvent.candidate)
    //     }
    //     // localConnection.oniceconnectionstatechange = (stateChangeEvent) => console.log('localConnection state Change ', stateChangeEvent)

    //     // Add Ice Candidate when created
    //     remoteConnection.onicecandidate = (iceEvent) => {
    //         // console.log('RemoteConnection : Adding Candidate', iceEvent.candidate)
    //         if (iceEvent.candidate) localConnection.addIceCandidate(iceEvent.candidate)
    //     }
    //     // remoteConnection.oniceconnectionstatechange = (stateChangeEvent) => console.log('remote state Change', stateChangeEvent)

    //     remoteConnection.addEventListener('track', gotRemoteStream);

    //     stream.getTracks().forEach(track => localConnection.addTrack(track, stream));
    //     console.log('Added stream to local');

    //     // Create an offer to connect (Sets up the terms for the call)
    //     localConnection.createOffer({ offerToReceiveVideo: true }).then(async (offer) => {
    //         // console.log(`Offer from local\n${offer.sdp}`);
    //         // Set the description of tye call on the local PC
    //         // console.log('local setLocalDescription start');
    //         await localConnection.setLocalDescription(offer).catch(pipeErr)
    //         // console.log(`remote setRemoteDescription start`);
    //         // Set the description of the call on the remote PC
    //         await remoteConnection.setRemoteDescription(offer).catch(pipeErr)
    //         // Remote PC answers local
    //         console.log("creating answer")
    //         const answer = await remoteConnection.createAnswer().catch(pipeErr)
    //         // console.log(`Answer from remote:\n${offer.sdp}`);
    //         // Set the description of the answer to the call remote
    //         // console.log('remote setLocalDescription start');
    //         await remoteConnection.setLocalDescription(answer).catch(pipeErr)
    //         // Set the description of the answer to the call on local
    //         // console.log('local setRemoteDescription start');
    //         await localConnection.setRemoteDescription(answer).catch(pipeErr)
    //     })
    //         .catch(err => console.error(err))
    // }

    const disconnectCall = () => {
        //emptyTracks
        socketContext?.socket?.current?.emptyTracks()
    }

    useEffect(() => {
        if (selectedRoom) joinRoom(selectedRoom)
        return disconnectCall
    }, [selectedRoom])


    return (
        <div>
            <div style={{ position: "relative" }}>
                <video ref={videoRef} onCanPlay={canPlay} id="player" autoPlay playsInline muted width="426" height="240" />
                <p style={{ position: "absolute", color: 'white', top: 10, left: 10 }}>Your Name: {"client"}</p>
            </div>
            {/* {inCall ? ( */}
            <VideoPanel videoRef={incomingVidRef}></VideoPanel>

            <p>{callMessage}</p>
            {/* <Button content="Join Room" primary onClick={() => signalConnect()} disabled={inCall} /> */}
        </div>
    )
}