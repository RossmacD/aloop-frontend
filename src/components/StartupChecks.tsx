import React, { useContext, useEffect } from 'react'
import { useGetSelfQuery } from '../api/authQueries';
import { AuthUserContext } from './app/App';
import { LOGIN } from './app/authReducer';
import { SocketContext } from './app/SocketProvider';

interface Props {

}

export const StartupChecks: React.FC<Props> = ({ children }) => {
    const authcontext = useContext(AuthUserContext)
    const socketContext = useContext(SocketContext)
    const { data, error } = useGetSelfQuery();

    useEffect(() => {
        if (data && !error && authcontext && socketContext.connectWebsocket) {
            authcontext?.dispatch({
                type: LOGIN,
                payload: data,
                connectWebsocket: socketContext.connectWebsocket
            })
        }
    }, [data, error])

    return (
        <div>
            {children}
        </div>
    )
}