import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Button, Flex, Debug } from '@fluentui/react-northstar'
import { IconContext } from 'react-icons'
import { ws, client, room, makeConnection, localConnection } from '../../utils/sockets/socket';
import Router from '../../routes/Router'
import { useQuery, useMutation, useQueryCache, QueryCache, ReactQueryCacheProvider } from 'react-query'

const queryCache = new QueryCache()

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <IconContext.Provider value={{ size: '1.25rem' }}>
          <Flex column>
            <Router />
            <Debug />
          </Flex>
        </IconContext.Provider>
      </BrowserRouter>
    </ReactQueryCacheProvider>
  );
}

export default App;
