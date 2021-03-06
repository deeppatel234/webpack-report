import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from 'src/AppContext';
import Typography from 'Components/Typography';
import Card from 'Components/Card';
import Empty from 'Components/Empty';

import WarningIcon from 'Components/Icons/Warning';
import CloseCircleIcon from 'Components/Icons/CloseCircle';

import {
  InfoWrapper,
  InfoHeader,
  InfoBody,
  ListItem,
  ListInfo,
} from './styled';

const BadgeItem = ({ displayName, value, icon: Icon, ...props }) => (
  <ListItem color="info" {...props}>
    <Icon width="1.5rem" />
    <ListInfo>
      <Typography color="muted" variant="helpText" uppercase>
        {displayName}
      </Typography>
      <Typography weight="600">{value}</Typography>
    </ListInfo>
  </ListItem>
);

const Info = ({ match }) => {
  const { stateData } = useContext(AppContext);
  const {
    params: { type },
  } = match;

  if (!['errors', 'warnings'].includes(type)) {
    return <Redirect to="/" />;
  }

  const infoList = stateData[type] || [];
  const color = type === 'errors' ? 'error' : 'warning';

  return (
    <InfoWrapper>
      <InfoHeader>
        <BadgeItem
          to="/info/errors"
          displayName="Errors"
          icon={CloseCircleIcon}
          color="error"
          value={stateData.errors.length}
        />
        <BadgeItem
          to="/info/warnings"
          displayName="Warnings"
          icon={WarningIcon}
          color="warning"
          value={stateData.warnings.length}
        />
      </InfoHeader>
      <InfoBody>
        {!infoList.length && <Empty message={`No ${type} found`} />}
        {infoList.map(info => (
          <Card
            key={info}
            borderColor={color}
            color={color}
            margin="6px 12px"
            className="cards"
            dangerouslySetInnerHTML={{ __html: info }}
          />
        ))}
      </InfoBody>
    </InfoWrapper>
  );
};

export default Info;
