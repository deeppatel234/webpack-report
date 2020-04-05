import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';

import AppContext from 'src/AppContext';
import Typography from 'Components/Typography';
import Card from 'Components/Card';

import LeftCircle from 'Components/Icons/LeftCircle';

import { InfoWrapper, InfoHeader, InfoBody } from './styled';

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
        <Link to="/">
          <LeftCircle width="2rem" />
        </Link>
        <Typography variant="h4">{type}</Typography>
      </InfoHeader>
      <InfoBody>
        {infoList.map(info => (
          <Card key={info} borderColor={color} margin="6px 12px">
            <Typography color={color}>
              <div dangerouslySetInnerHTML={{ __html: info }} />
            </Typography>
          </Card>
        ))}
      </InfoBody>
    </InfoWrapper>
  );
};

export default Info;
