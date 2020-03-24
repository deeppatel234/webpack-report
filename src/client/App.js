import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import _isEmpty from 'lodash/isEmpty';
import ContextDevTool from 'react-context-devtool';

import AppContext from './AppContext';
import ProgressOverlay from './components/ProgressOverlay';
import Dashboard from './components/Dashboard';
import GlobalCSS from './GlobalCSS';

const { port, hostname } = document.location;

const socket = io(`${hostname}:${port}`);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appData, setAppData] = useState({
    progress: {},
  });

  useEffect(() => {
    socket.on('data', event => {
      setAppData(event);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  const isAppLoaded =
    appData.progress.percentage === 100 && !_isEmpty(appData.stateData);

  return (
    <AppContext.Provider value={appData}>
      <GlobalCSS />
      <ContextDevTool
        context={AppContext}
        id="appData"
        displayName="App Data"
      />
      {isAppLoaded ? <Dashboard /> : <ProgressOverlay />}
    </AppContext.Provider>
  );
};

export default App;
