import React from 'react';

import Typography from '../Typography';
import ArrowRight from '../Icons/ArrowRight';

import { CardWrapper, InfoWrapper, ContentWrapper } from './styled';

const StatisticsCard = ({ icon, color, header, text, width }) => {
  return (
    <CardWrapper color={color} width={width}>
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
