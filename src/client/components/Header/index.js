import React, { useContext } from 'react';

import AppContext from '../../AppContext';
import Typography from '../UI/Typography';

import { HeaderWrapper, HeaderCol, ProjectName, VersionName } from './styled';

const Header = () => {
  const { packageJson, stateData } = useContext(AppContext);
  const { name, version } = packageJson;
  const { version: webpackVersion } = stateData;

  return (
    <HeaderWrapper>
      <HeaderCol>
        <Typography>Webpack Dashboard</Typography>
        {name && (
          <>
            <ProjectName>{name}</ProjectName>
            <VersionName variant="subText">v {version}</VersionName>
          </>
        )}
      </HeaderCol>
      <HeaderCol>
        <Typography>{webpackVersion}</Typography>
      </HeaderCol>
    </HeaderWrapper>
  );
};

export default Header;
