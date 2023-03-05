import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import AppContext from "src/AppContext";
import { ASSETS_TYPE } from "src/const";
import { size } from "src/utils";

import Typography from "Components/Typography";
import SizeChart from "Components/SizeChart";
import NofileIcon from "Components/Icons/NoFile";
import Table from "Components/Table";
import Empty from "Components/Empty";
import GraphWarning from "Components/GraphWarning";

import { DetailsWrapper, SideBar, Body, Title } from "Components/Styles";

import { ListItem, InfoWrapper } from "./styled";

const headers = [
  { key: "name", header: "Name", sort: true },
  {
    key: "size",
    header: "Size",
    fileSize: true,
    sort: true,
    className: "size-column",
  },
  {
    key: "open",
    className: "link-column",
    render: ({ rowData }) => {
      const url = `/build/${rowData.name}`;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Open File
        </a>
      );
    },
  },
];

function AssetsDetails() {
  const { type } = useParams();
  const { stateData } = useContext(AppContext);
  const { assetsState } = stateData;

  if (!assetsState[type]) {
    return <Navigate to={`/assets/${ASSETS_TYPE[0].key}`} />;
  }

  const assetsData = ASSETS_TYPE.find(({ key }) => type === key);

  return (
    <DetailsWrapper>
      <SideBar>
        <Title variant="h5">Assets</Title>
        {ASSETS_TYPE.map(({ key, displayName, icon: Icon, iconWidth, ...props }) => (
          <ListItem key={key} color="info" to={`/assets/${key}`} {...props}>
            <Icon width="1.5rem" />
            <InfoWrapper>
              <Typography color="muted" variant="helpText" uppercase>
                {displayName}
              </Typography>
              <Typography weight="600">{size(assetsState[key].size)}</Typography>
            </InfoWrapper>
          </ListItem>
        ))}
      </SideBar>
      <Body>
        {assetsState[type].assets.length ? (
          <>
            <GraphWarning id={type} dataLength={assetsState[type].assets.length}>
              <SizeChart id={type} data={assetsState[type].assets} />
            </GraphWarning>
            <Table
              searchKey="name"
              title={`${assetsData.header} (${assetsState[type].assets.length})`}
              headers={headers}
              data={assetsState[type].assets}
            />
          </>
        ) : (
          <Empty message="No Assets Found">
            <NofileIcon width="3rem" />
          </Empty>
        )}
      </Body>
    </DetailsWrapper>
  );
}

export default AssetsDetails;
