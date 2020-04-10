import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AppContext from 'src/AppContext';

import FileIcon from 'Components/Icons/File';
import NodeJSIcon from 'Components/Icons/NodeJS';
import DuplicateIcon from 'Components/Icons/Duplicate';
import Typography from 'Components/Typography';

import TotalModles from './TotalModules';
import NodeModules from './NodeModules';
import DuplicateModules from './DuplicateModules';

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

const moduleRoutes = ['all', 'node-modules', 'duplicate-modules'];

const ModuleDetails = ({ match }) => {
  const { stateData } = useContext(AppContext);

  const { moduleState } = stateData;

  const {
    params: { type },
  } = match;

  if (!moduleRoutes.includes(type)) {
    return <Redirect to={`/modules/${moduleRoutes[0]}`} />;
  }

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
          to="/modules/node-modules"
          displayName="Node Modules"
          icon={NodeJSIcon}
          className="nodejs"
          value={`${moduleState.totalPackagesModule} (${moduleState.totalPackages})`}
        />
        <SideBarItem
          to="/modules/duplicate-modules"
          displayName="Duplicate Modules"
          icon={DuplicateIcon}
          color="info"
          value={moduleState.duplicateModules}
        />
      </SideBar>
      <Body>
        <Route path="/modules/all" component={TotalModles} />
        <Route path="/modules/node-modules" component={NodeModules} />
        <Route path="/modules/duplicate-modules" component={DuplicateModules} />
      </Body>
    </DetailsWrapper>
  );
};

export default ModuleDetails;
