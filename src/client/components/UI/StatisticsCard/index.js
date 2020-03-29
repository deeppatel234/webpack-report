import React from 'react';

import Typography from '../Typography';
import ArrowRight from '../Icons/ArrowRight';

import { CardWrapper, InfoWrapper, ContentWrapper } from './styled';

const StatisticsCard = ({ icon, header, text, ...props }) => {
  return (
    <CardWrapper {...props}>
      <ContentWrapper flexStart>
        {icon}
        <InfoWrapper>
          <Typography color="muted" variant="subText" uppercase>
            {header}
          </Typography>
          <Typography variant="h6">{text}</Typography>
        </InfoWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <ArrowRight color="icon" />
      </ContentWrapper>
    </CardWrapper>
  );
};

StatisticsCard.defaultProps = {
  color: 'white',
};

export default StatisticsCard;
