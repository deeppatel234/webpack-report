import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from 'src/AppContext';
import { ASSETS_TYPE } from 'src/const';
import { size } from 'src/utils';

import Typography from 'Components/Typography';
import SizeChart from 'Components/SizeChart';
import NofileIcon from 'Components/Icons/NoFile';
import Table from 'Components/Table';
import Empty from 'Components/Empty';

import {
  DetailsWrapper,
  SideBar,
  Body,
  ListItem,
  InfoWrapper,
  Title,
  TableWrapper,
} from './styled';

const headers = [
  { key: 'name', header: 'Name', sort: true },
  { key: 'size', header: 'Size', fileSize: true, sort: true },
];

const AssetsDetails = ({ match }) => {
  const { stateData } = useContext(AppContext);
  const { assetsState } = stateData;

  const {
    params: { type },
  } = match;

  if (!assetsState[type]) {
    return <Redirect to={`/assets/${ASSETS_TYPE[0].key}`} />;
  }

  const assetsData = ASSETS_TYPE.find(({ key }) => type === key);

  return (
    <DetailsWrapper>
      <SideBar>
        <Title variant="h5">Assets</Title>
        {ASSETS_TYPE.map(
          ({ key, displayName, icon: Icon, iconWidth, ...props }) => (
            <ListItem key={key} color="info" to={key} {...props}>
              <Icon width="1.5rem" />
              <InfoWrapper>
                <Typography color="muted" variant="helpText" uppercase>
                  {displayName}
                </Typography>
                <Typography weight="600">
                  {size(assetsState[key].size)}
                </Typography>
              </InfoWrapper>
            </ListItem>
          ),
        )}
      </SideBar>
      <Body>
        {assetsState[type].assets.length ? (
          <>
            <SizeChart id={type} data={assetsState[type].assets} />
            <TableWrapper>
              <Table
                searchKey="name"
                title={`${assetsData.header} (${assetsState[type].assets.length})`}
                headers={headers}
                data={assetsState[type].assets}
              />
            </TableWrapper>
          </>
        ) : (
          <Empty message="No Assets Found">
            <NofileIcon width="3rem" />
          </Empty>
        )}
      </Body>
    </DetailsWrapper>
  );
};

export default AssetsDetails;
