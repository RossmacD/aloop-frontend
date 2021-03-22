import React from 'react'

interface Props {
    videoRef: React.RefObject<HTMLVideoElement>,
    canPlay?: () => void,
    self?: boolean
}

export const VideoPanel: React.FC<Props> = ({ children, videoRef, canPlay, self }) => {
    return (
        <div style={{ position: "relative" }}>
            <video ref={videoRef} playsInline autoPlay width="426" height="240"></video>
            <p style={{ position: "absolute", color: 'white', top: 10, left: 10 }}>Caller Name: {'caller'}</p>
        </div>
    )
}