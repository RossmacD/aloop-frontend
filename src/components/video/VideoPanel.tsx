import React, { RefObject } from 'react'
import { Flex } from '@fluentui/react-northstar'
interface Props {
    videoRef: ((element: HTMLVideoElement | null) => HTMLVideoElement | null) | RefObject<HTMLVideoElement>,
    canPlay?: () => void,
    self?: number
}
// 426 240
export const VideoPanel: React.FC<Props> = ({ children, videoRef, canPlay, self }) => {
    return (
        <Flex style={{ position: "relative", flexDirection: "column", height: "fit-content", margin: "1rem" }}>
            <video ref={videoRef} playsInline autoPlay width="639" height="360" style={{ clipPath: 'circle()' }}></video>
            <p style={{ color: 'white', position: "absolute", bottom: 0, width: "100%", textAlign: "center" }}>Caller ID: {self || 'caller'}</p>
        </Flex>
    )
}