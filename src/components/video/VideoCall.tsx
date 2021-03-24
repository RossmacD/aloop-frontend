import { Button } from '@fluentui/react-northstar'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { useRefArrayCallback } from '../../utils/useRefCallback';
import { SocketContext } from '../app/SocketProvider';
import { VideoPanel } from './VideoPanel';
// import { makeConnection, localConnection, client } from '../../utils/sockets/socket';!!!

interface Props {
    selectedRoom: String | undefined
}

export const VideoCall: React.FC<Props> = ({ children, selectedRoom }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [incomingVidRef, setIncomingVidRef] = useRefArrayCallback<HTMLVideoElement>(
        (vidRef) => {
            if (vidRef.current) {
                console.log("processing vidref")
                processVidRef(vidRef)
            } else {
                console.error("No process bruh")
            }
        },
        (vidRef) => {
            //Drop connections
        },
        []);
    // const [streamOut, setStream] = useState<MediaStream>()
    const [inCall, setInCall] = useState(false)
    const [callMessage, setCallMessage] = useState<string>("")
    const [callMembers, setCallMembers] = useState<number[]>([])
    interface QMSG {
        e: any,
        id: number
    }
    const [vidQueue, setVidQueue] = useState<QMSG[]>([])


    const socketContext = useContext(SocketContext)


    const joinRoom = (room: String) => {
        console.log("Joining Call")
        setInCall(true)
        if (socketContext?.socket?.current?.makeConnection(room, setCallMembers)) {
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

    const gotRemoteStream = (e: any, id: number) => {
        console.log("GOT reomte", e)
        if (incomingVidRef?.current && incomingVidRef.current[id] && incomingVidRef.current[id]?.srcObject !== e.streams[0]) {
            incomingVidRef.current[id].srcObject = e.streams[0];
        } else {
            console.log("Adding to queue", id)
            setVidQueue((queue) => [...queue, { e, id }])
        }
    }

    const processVidRef = (ref: React.MutableRefObject<HTMLVideoElement[] | undefined>) => {
        if (ref.current) {
            for (const message of vidQueue) {
                if (ref.current[message.id]) {
                    // Process the queue
                    gotRemoteStream(message.e, message.id);
                    // Remove from the queue
                    setVidQueue((queue) => {
                        return [...queue.splice(message.id, 1)]
                    })
                }
            }
        }
    }

    useEffect(() => {
        //     // This processes the queue as members come in, this is done becuase members can be added after the stream attempts to add the tracks and so may need to be reproccessed on a new item
        //     for (const message of vidQueue) {
        //         if (incomingVidRef.current[message.id]) {
        //             gotRemoteStream(message.e, message.id);
        //             setVidQueue((queue) => {
        //                 return [...queue.splice(message.id, 1)]
        //             })
        //         }
        //         // console.log("processing msg:", message)
        //         // const index = Array.from(callMembers).indexOf(message.id)
        //         // if (index !== -1) {
        //         //              // }
        console.log("added CallMember", callMembers)
    }, [callMembers])

    // ()=>setIncomingVidRef(node)


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

            {callMembers.map((member) =>
            (
                <>
                    <VideoPanel videoRef={setIncomingVidRef(member)} key={member} />
                    <p>NEWCAMERA</p>
                </>)
            )}
            <p>{callMessage}</p>
        </div>
    )
}