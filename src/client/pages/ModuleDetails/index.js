import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import AppContext from 'src/AppContext';

import FileIcon from 'Components/Icons/File';
import NodeJSIcon from 'Components/Icons/NodeJS';
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

const SideBarItem = ({ to, displayName, value, icon: Icon, ...props }) => (
  <ListItem color="info" to={to} {...props}>
    <Icon width="1.5rem" />
    <InfoWrapper>
      <Typography color="muted" variant="helpText" uppercase>
        {displayName}
      </Typography>
      <Typography weight="600">{value}</Typography>
    </InfoWrapper>
  </ListItem>
);

const ModuleDetails = () => {
  const { stateData } = useContext(AppContext);

  const { moduleState } = stateData;

  return (
    <DetailsWrapper>
      <SideBar>
        <Title variant="h5">Modules</Title>
        <SideBarItem
          to="/modules/all"
          displayName="All Modules"
          icon={FileIcon}
          value={moduleState.totalModules}
        />
        <SideBarItem
          to="/modules/node_modules"
          displayName="Node Modules"
          icon={NodeJSIcon}
          className="nodejs"
          value={`${moduleState.totalPackagesModule} (${moduleState.totalPackages})`}
        />
      </SideBar>
      <Body>
        <Route path="/modules/all" component={TotalModles} />
        <Route path="/modules/node_modules" component={NodeModules} />
      </Body>
    </DetailsWrapper>
  );
};

export default ModuleDetails;
