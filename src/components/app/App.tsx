import React, { createContext, useEffect, useReducer } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Button, Flex, Debug } from '@fluentui/react-northstar'
import { IconContext } from 'react-icons'
// import { ws, client, room, makeConnection, localConnection } from '../../utils/sockets/socket';
import Router from '../../routes/Router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { authReducer, UserAuthContext } from './authReducer';
import { SocketProvider } from './SocketProvider'
import { useGetSelfQuery } from '../../api/authQueries';
import { StartupChecks } from '../StartupChecks';
// The query client for react fetch
export const queryClient = new QueryClient()

// The Context for global Auth state (Context API)
export const AuthUserContext = createContext<typeof undefined | UserAuthContext>(undefined);

function App() {
  const [selfState, dispatch] = useReducer(authReducer, {
    auth: false,
    user: null
  })






  return (
    <AuthUserContext.Provider value={{ selfState, dispatch }}>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <StartupChecks>
            <BrowserRouter>
              <IconContext.Provider value={{ size: '1.25rem' }}>
                <Flex column>
                  <Router />
                  <Debug />
                </Flex>
              </IconContext.Provider>
            </BrowserRouter>
          </StartupChecks>
        </QueryClientProvider>
      </SocketProvider>
    </AuthUserContext.Provider>
  );
}

export default App;
