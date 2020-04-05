import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from 'src/AppContext';
import AppThemeContext from 'src/AppThemeContext';
import Typography from 'UI/Typography';
import LightThemeIcon from 'UI/Icons/LightTheme';
import DarkThemeIcon from 'UI/Icons/DarkTheme';

import {
  HeaderWrapper,
  HeaderCol,
  ProjectName,
  VersionName,
  ThemeButton,
} from './styled';

const Header = () => {
  const { packageJson } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(AppThemeContext);
  const { name, version } = packageJson;

  return (
    <HeaderWrapper>
      <HeaderCol>
        <Link to="/">
          <Typography color="white">Webpack Dashboard</Typography>
        </Link>
        {name && (
          <>
            <ProjectName color="white">{name}</ProjectName>
            <VersionName color="white" variant="subText">
              v {version}
            </VersionName>
          </>
        )}
      </HeaderCol>
      <HeaderCol>
        <ThemeButton onClick={toggleTheme}>
          {theme === 'light' ? (
            <LightThemeIcon color="white" width="1.5rem" />
          ) : (
            <DarkThemeIcon color="white" width="1.5rem" />
          )}
        </ThemeButton>
      </HeaderCol>
    </HeaderWrapper>
  );
};

export default Header;
