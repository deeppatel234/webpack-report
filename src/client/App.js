import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ContextDevTool from 'react-context-devtool';

import AppContext from './AppContext';

const { port, hostname } = document.location;

const socket = io(`${hostname}:${port}`);

const App = () => {
  const [appData, setAppData] = useState({});

  useEffect(() => {
    socket.on('data', setAppData);
  }, []);

  return (
    <AppContext.Provider value={appData}>
      <ContextDevTool
        context={AppContext}
        id="appData"
        displayName="App Data"
      />
      <div>Hello World</div>
    </AppContext.Provider>
  );
};

export default App;
