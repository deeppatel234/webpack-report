import React, { useContext } from 'react';

import AppContext from '../../AppContext';
import AppThemeContext from '../../AppThemeContext';
import Typography from '../UI/Typography';

import { HeaderWrapper, HeaderCol, ProjectName, VersionName } from './styled';

const Header = () => {
  const { packageJson, stateData } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(AppThemeContext);
  const { name, version } = packageJson;
  const { version: webpackVersion } = stateData;

  return (
    <HeaderWrapper>
      <HeaderCol>
        <Typography color="white">Webpack Dashboard</Typography>
        {name && (
          <>
            <ProjectName color="white">{name}</ProjectName>
            <VersionName color="white" variant="subText">v {version}</VersionName>
          </>
        )}
      </HeaderCol>
      <HeaderCol>
        <button onClick={toggleTheme}>{theme}</button>
        <Typography>{webpackVersion}</Typography>
      </HeaderCol>
    </HeaderWrapper>
  );
};

export default Header;
