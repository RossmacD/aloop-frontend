import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Button, Flex, Debug } from '@fluentui/react-northstar'
import { IconContext } from 'react-icons'
import { ws, client, room, makeConnection, localConnection } from '../../utils/sockets/socket';
import Router from '../../routes/Router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const queryClient = new QueryClient()

function App() {
  return (
    // <ReactQueryCacheProvider queryCache={queryCache}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <IconContext.Provider value={{ size: '1.25rem' }}>
          <Flex column>
            <Router />
            <Debug />
          </Flex>
        </IconContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
