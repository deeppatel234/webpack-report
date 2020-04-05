import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import AppContext from 'src/AppContext';
import { MODULE_TYPE } from 'src/const';

import Typography from 'Components/Typography';

import TotalModles from './TotalModules';
import NodeModules from './NodeModules';

import {
  DetailsWrapper,
  SideBar,
  Body,
  ListItem,
  InfoWrapper,
  Title,
} from './styled';

const ModuleDetails = () => {
  const { stateData } = useContext(AppContext);

  const { modules, packageSize } = stateData;

  const packageJsonLength = Object.keys(packageSize).length;
  const packageJsonModules = Object.keys(packageSize).reduce((acc, key) => {
    return acc + packageSize[key].modules.length;
  }, 0);

  const values = {
    '/modules/all': modules.length,
    '/modules/node_modules': `${packageJsonModules} (${packageJsonLength})`,
  };

  return (
    <DetailsWrapper>
      <SideBar>
        <Title variant="h5">Modules</Title>
        {MODULE_TYPE.map(
          ({ key, displayName, icon: Icon, iconWidth, ...props }) => (
            <ListItem key={key} color="info" to={key} {...props}>
              <Icon width="1.5rem" />
              <InfoWrapper>
                <Typography color="muted" variant="helpText" uppercase>
                  {displayName}
                </Typography>
                <Typography weight="600">{values[key]}</Typography>
              </InfoWrapper>
            </ListItem>
          ),
        )}
      </SideBar>
      <Body>
        <Route path="/modules/all" component={TotalModles} />
        <Route path="/modules/node_modules" component={NodeModules} />
      </Body>
    </DetailsWrapper>
  );
};

export default ModuleDetails;
