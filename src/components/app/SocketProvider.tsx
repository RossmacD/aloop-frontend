import React, { createContext, useContext, useRef } from 'react'
import { RTCSocket } from '../../utils/sockets/socketTemp';
import { Option } from '../../utils/types'

interface Props {

}

interface SocketApiContext {
    socket: Option<React.MutableRefObject<Option<RTCSocket>>>,
    connectWebsocket: (user_id: number) => void

}

export const SocketContext = createContext<SocketApiContext>({ socket: undefined, connectWebsocket: () => { } })

export const SocketProvider: React.FC<Props> = ({ children }) => {
    const socket = useRef<Option<RTCSocket>>(undefined);
    const connectWebsocket = (user_id: number) => {
        if ((!socket.current || socket.current?.ws.readyState === WebSocket.CLOSED)) {
            // Connect
            socket.current = new RTCSocket(user_id).setSocketHandlers();
        }
    }

    return (
        <SocketContext.Provider value={{ socket, connectWebsocket }}>
            {children}
        </SocketContext.Provider>
    )
}