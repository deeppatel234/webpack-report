/* global NODE_ENV */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import _isEmpty from 'lodash/isEmpty';
import { ThemeProvider } from 'emotion-theming';

import AppContext from './AppContext';
import AppThemeContext from './AppThemeContext';

import Pages from './pages';
import ProgressOverlay from './pages/ProgressOverlay';
import LoadingScreen from './pages/ProgressOverlay/LoadingScreen';

import GlobalCSS from './GlobalCSS';
import { theme as themeConfig } from './theme';
import { getThemeFromLocal, setThemeInLocal } from './utils';

const { port, hostname } = document.location;

const socketPort = NODE_ENV === 'development' ? 5060 : port;

const socket = io(`${hostname}:${socketPort}`);

const DEFAULT_THEME = getThemeFromLocal() || 'dark';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appData, setAppData] = useState({
    progress: {},
  });
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    socket.on('data', event => {
      setAppData(event);
      setIsLoading(false);
    });
  }, []);

  const toggleTheme = () => {
    const themeToSet = theme === 'light' ? 'dark' : 'light';
    setTheme(themeToSet);
    setThemeInLocal(themeToSet);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const isAppLoaded =
    appData.progress.percentage === 100 && !_isEmpty(appData.stateData);

  return (
    <AppContext.Provider value={appData}>
      <AppThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={themeConfig[theme]}>
          <GlobalCSS />
          {isAppLoaded ? <Pages /> : <ProgressOverlay />}
        </ThemeProvider>
      </AppThemeContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
