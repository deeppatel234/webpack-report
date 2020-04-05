import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import _isEmpty from 'lodash/isEmpty';
import ContextDevTool from 'react-context-devtool';
import { ThemeProvider } from 'emotion-theming';

import AppContext from './AppContext';
import AppThemeContext from './AppThemeContext';

import Pages from './pages';
import ProgressOverlay from './pages/ProgressOverlay';

import GlobalCSS from './GlobalCSS';
import { theme as themeConfig } from './theme';
import { getThemeFromLocal, setThemeInLocal } from './utils';

const { port, hostname } = document.location;

// TODO: change with port
const socket = io(`${hostname}:${5060}`);

console.log(themeConfig);

const DEFAULT_THEME = getThemeFromLocal() || 'light';

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
    return null;
  }

  const isAppLoaded =
    appData.progress.percentage === 100 && !_isEmpty(appData.stateData);

  return (
    <AppContext.Provider value={appData}>
      <AppThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={themeConfig[theme]}>
          <GlobalCSS />
          <ContextDevTool
            context={AppContext}
            id="appData"
            displayName="App Data"
          />
          {isAppLoaded ? <Pages /> : <ProgressOverlay />}
        </ThemeProvider>
      </AppThemeContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
