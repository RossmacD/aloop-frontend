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
            setInCall(false)
            console.log("Could not connect")
            setCallMessage("Could not connect")
        }
    }

    const pipeErr = (err: Error) => { throw err }

    useEffect(() => {
        // console.log(navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then)
        if (!navigator.mediaDevices?.getUserMedia({ audio: false, video: true })
            .then((stream) => {
                // console.log("Stream")
                if (videoRef?.current) {
                    videoRef.current.srcObject = stream
                    console.log("Adding Stream", socketContext?.socket?.current)
                    // socketContext?.socket?.current?.localConnection.ontrack = gotRemoteStream;
                    socketContext?.socket?.current?.setTracks(gotRemoteStream, stream)
                    // stream.getTracks().forEach(track => localConnection.addTrack(track, stream));
                    //! setStream(stream)
                    // !makeVideoCall(stream)
                } else {
                    // console.log("oh nowy")
                }
            }).catch((err) => console.error(`Error getting media device`, err))) {
            // There are no media devices
            setCallMessage("No media devices found, is your camera / microphone connected?")
        } else {
            // console.log("noVideo")
        };
    }, [videoRef])

    const canPlay = () => {
        if (videoRef?.current) { videoRef.current.play() }
    }

    const gotRemoteStream = (e: any) => {
        console.log("GOT reomte", e)
        if (incomingVidRef?.current && incomingVidRef?.current?.srcObject !== e.streams[0]) {
            incomingVidRef.current.srcObject = e.streams[0];
            // console.log('pc2 received remote stream');
        }
    }

    const disconnectCall = () => {
        //emptyTracks
        socketContext?.socket?.current?.emptyTracks()
    }

    useEffect(() => {
        console.log("Joining selected Romm:", selectedRoom)
        if (selectedRoom) {
            joinRoom(selectedRoom)
        }
        return disconnectCall
    }, [selectedRoom])


    return (
        <div>
            <div style={{ position: "relative" }}>
                <video ref={videoRef} onCanPlay={canPlay} id="player" autoPlay playsInline muted width="426" height="240" />
                <p style={{ position: "absolute", color: 'green', top: 10, left: 10 }}>Your Name: {"client"}</p>
            </div>
            {/* {inCall ? ( */}
            <VideoPanel videoRef={incomingVidRef}></VideoPanel>

            <p>{callMessage}</p>
            {/* <Button content="Join Room" primary onClick={() => signalConnect()} disabled={inCall} /> */}
        </div>
    )
}