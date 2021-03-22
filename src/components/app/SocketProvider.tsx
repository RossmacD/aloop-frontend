import React, { createContext, useContext, useRef } from 'react'
import { BASE_SOCKET_URL } from '../../config';
import { setSocketHandlers } from '../../utils/sockets/socket';
import { Option } from '../../utils/types'
import { AuthUserContext } from './App'
interface Props {

}

interface SocketApiContext {
    ws: Option<WebSocket>,
    connectWebsocket: (user_id: number) => void

}

export const SocketContext = createContext<SocketApiContext>({ ws: undefined, connectWebsocket: () => { } })

export const SocketProvider: React.FC<Props> = ({ children }) => {
    const authContext = useContext(AuthUserContext)

    const ws = useRef<Option<WebSocket>>(undefined);

    const connectWebsocket = (user_id: number) => {
        if ((!ws.current || ws.current?.readyState === WebSocket.CLOSED) /*&& authContext?.selfState.auth && authContext?.selfState.user?.user_id*/) {
            // Connect
            ws.current = new WebSocket(`${BASE_SOCKET_URL}/signalling/`);
            // Set websocket events
            ws.current = setSocketHandlers(ws.current, "#!Main", user_id)
        }
    }




    return (
        <SocketContext.Provider value={{ ws: ws.current, connectWebsocket }}>
            {children}
        </SocketContext.Provider>
    )
}