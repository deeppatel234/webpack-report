import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import AppContext from "src/AppContext";

import FileIcon from "Components/Icons/File";
import NodeJSIcon from "Components/Icons/NodeJS";
import DuplicateIcon from "Components/Icons/Duplicate";
import Typography from "Components/Typography";
import { DetailsWrapper, SideBar, Body, Title } from "Components/Styles";

import { ListItem, InfoWrapper } from "./styled";

function SideBarItem({ to, displayName, value, icon: Icon, ...props }) {
  return (
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
}

function ModuleDetails() {
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
        <Outlet />
      </Body>
    </DetailsWrapper>
  );
}

export default ModuleDetails;
