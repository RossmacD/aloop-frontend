import { Button, Grid, Flex } from '@fluentui/react-northstar'
import React, { useEffect, useRef, useState, useContext, RefObject, useMemo } from 'react'
import { useRefArrayCallback } from '../../utils/useRefCallback';
import { AuthUserContext } from '../app/App';
import { SocketContext } from '../app/SocketProvider';
import { VideoPanel } from './VideoPanel';
// import { makeConnection, localConnection, client } from '../../utils/sockets/socket';!!!
// const useDimensions = require("react-use-dimensions");
import useDimensions from "react-cool-dimensions";
import { useGetUsers } from '../../api/authQueries';

interface Props {
    selectedRoom: [number, String] | undefined,
    setSelectedRoom: React.Dispatch<React.SetStateAction<[number, String] | undefined>>
}

export const VideoCall: React.FC<Props> = ({ children, selectedRoom, setSelectedRoom }) => {
    const authcontext = useContext(AuthUserContext)
    const videoRef = useRef<HTMLVideoElement>(null);
    const { data: userList } = useGetUsers()
    const usersMap = useMemo(() => {
        const converted: { [id: number]: string } = {}
        userList?.forEach((user) => {
            converted[user.user_id] = `${user.first_name} ${user.last_name}`;
        })
        return converted
    }, [userList])


    const [incomingVidRef, setIncomingVidRef] = useRefArrayCallback<HTMLVideoElement>(
        (vidRef) => {
            if (vidRef.current) {
                console.log("processing vidref");
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
    const [inCall, setInCall] = useState(false);
    const [callMessage, setCallMessage] = useState<string>("")
    const [callMembers, setCallMembers] = useState<number[]>([])
    interface QMSG {
        e: any,
        id: number
    }
    const [vidQueue, setVidQueue] = useState<QMSG[]>([])


    const socketContext = useContext(SocketContext)
    // const panelRef = useRef(null)
    const [panelSize, setPanelSize] = useState<[number, number]>([0, 0])
    // useEffect(() => {
    //     console.log("Changin size", width, height)

    // }, [height, panelRef, callMembers])

    // console.log(useDimensions.default())
    // const [panelRef, { width, height }] = useDimensions.default();
    const { observe, width, height } = useDimensions({
        // onResize: ({ width, height, }) => {
        //     updateSizes(width, height, callMembers.length);
        // },
    });

    const updateSizes = (panW: number, panH: number, users: number) => {
        const margin = 50
        // users = users++
        console.log(callMembers.length, "memebers")
        if (panW > panH) {
            const square = Math.round(Math.sqrt(users + 1));
            const newHeight = users > 0 ? Math.floor(panH / (users + 1)) : panH
            const newWidth = newHeight
            setPanelSize([newHeight - margin, newWidth - margin])
        } else {
            const newHeight = users > 0 ? Math.floor(panW / (users + 1)) : panW

            setPanelSize([newHeight - margin, newHeight - margin])
        }
    }



    useEffect(() => {
        updateSizes(width, height, callMembers.length);
    }, [callMembers, height, width])



    const handleDisconnect = (id: number) => {
        setCallMembers((oldMembers) => {
            const peerIndex = oldMembers.findIndex((peer) => { return peer === id })
            if (peerIndex !== -1) { oldMembers.splice(peerIndex, 1) }
            return [...oldMembers]
        })
    }



    const joinRoom = (room: String) => {
        console.log("Joining Call")
        setInCall(true)
        if (socketContext?.socket?.current?.makeConnection(room, setCallMembers, handleDisconnect)) {
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
        if (!navigator.mediaDevices?.getUserMedia({ audio: true, video: { aspectRatio: 1 } })
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
    }, [videoRef.current])

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

    // useEffect(() => {
    //     //     // This processes the queue as members come in, this is done becuase members can be added after the stream attempts to add the tracks and so may need to be reproccessed on a new item
    //     //     for (const message of vidQueue) {
    //     //         if (incomingVidRef.current[message.id]) {
    //     //             gotRemoteStream(message.e, message.id);
    //     //             setVidQueue((queue) => {
    //     //                 return [...queue.splice(message.id, 1)]
    //     //             })
    //     //         }
    //     //         // console.log("processing msg:", message)
    //     //         // const index = Array.from(callMembers).indexOf(message.id)
    //     //         // if (index !== -1) {
    //     //         //              // }
    //     console.log("added CallMember", callMembers)
    // }, [callMembers])



    const disconnectCall = () => {
        //emptyTracks
        socketContext?.socket?.current?.emptyTracks();;
    }

    useEffect(() => {
        console.log("Joining selected Romm:", selectedRoom)
        if (selectedRoom) {
            joinRoom(selectedRoom[1])
        }
        return disconnectCall
    }, [selectedRoom])



    const [muted, setMuted] = useState(false)
    const [cameraOn, setCameraOn] = useState(false)

    return (
        <div style={{ width: "100%", display: 'flex', margin: 0, alignItems: "center", justifyContent: "center" }} ref={observe}>
            {/* { width + ' ' + height} */}
            {/* <div style={{ position: "relative" }}>
                <video ref={videoRef} onCanPlay={canPlay} id="player" autoPlay playsInline muted width="426" height="240" />
                <p style={{ position: "absolute", color: 'green', top: 10, left: 10 }}>{`${authcontext?.selfState.user?.first_name || ""} ${authcontext?.selfState.user?.last_name || ""}`}</p>
            </div> */}

            <VideoPanel mute videoRef={videoRef} size={panelSize} self
                name={`${authcontext?.selfState.user?.first_name} ${authcontext?.selfState.user?.last_name}`}
            ></VideoPanel>

            {callMembers.map((member) =>
            (
                <>
                    <VideoPanel videoRef={setIncomingVidRef(member)} key={member} size={panelSize} name={usersMap[member]} />
                </>)
            )}

            <Flex styles={{ position: 'absolute', bottom: 0 }}>
                <Button onClick={() => setMuted(!socketContext?.socket?.current?.muteMic())}>{muted ? "Unmute" : "Mute"}</Button>
                <Button onClick={() => setCameraOn(!socketContext?.socket?.current?.muteCam())}>Camera {cameraOn ? "On" : "Off"}</Button>
                <Button onClick={() => {
                    setSelectedRoom(undefined)
                    if (socketContext?.socket?.current) {
                        for (const connection of callMembers) {
                            socketContext.socket.current.connections?.get(connection)?.close()
                        }

                        socketContext.socket.current.connections = new Map<number, RTCPeerConnection>()
                        socketContext.socket.current.emptyTracks()
                        setCallMembers([])
                    }
                }}>Disconnect</Button>
            </Flex>

            <p>{callMessage}</p>
        </div>
    )
}