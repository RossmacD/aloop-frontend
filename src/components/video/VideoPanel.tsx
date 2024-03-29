import React, { RefObject } from 'react'
import { Flex } from '@fluentui/react-northstar'
interface Props {
    videoRef: ((element: HTMLVideoElement | null) => HTMLVideoElement | null) | RefObject<HTMLVideoElement>,
    canPlay?: () => void,
    self?: boolean,
    name?: string,
    size: [number, number],
    mute?: boolean
}
// 426 240
export const VideoPanel: React.FC<Props> = ({ children, videoRef, canPlay, self, name, size, mute = false }) => {
    return (
        <Flex style={{
            position: "relative",
            flexDirection: "column", height: "fit-content", margin: "0"
        }}>
            <video ref={videoRef} muted={mute} playsInline autoPlay width={size[1]} height={size[0]} style={{ clipPath: 'circle()' }}></video>
            <p style={{ color: self ? "green" : 'white', position: "absolute", bottom: 0, width: "100%", textAlign: "center" }}>{name || ''}</p>
        </Flex>
    )
}