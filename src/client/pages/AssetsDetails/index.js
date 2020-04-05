import React, { useContext } from 'react';
import AppContext from 'src/AppContext';

import { ASSETS_TYPE } from 'src/const';
import { size } from 'src/utils';

import Typography from 'UI/Typography';
import SizeChart from 'Components/SizeChart';

import {
  DetailsWrapper,
  SideBar,
  Body,
  ListItem,
  InfoWrapper,
  Title,
} from './styled';

const AssetsDetails = ({ match }) => {
  const { stateData } = useContext(AppContext);
  const { dashboardState } = stateData;

  const {
    params: { type },
  } = match;

  // const assetsData = ASSETS_TYPE.find(({ key }) => type === key);

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
                  {size(dashboardState[key].size)}
                </Typography>
              </InfoWrapper>
            </ListItem>
          ),
        )}
      </SideBar>
      <Body>
        <SizeChart id={type} data={dashboardState[type].assets} />
      </Body>
    </DetailsWrapper>
  );
};

export default AssetsDetails;
