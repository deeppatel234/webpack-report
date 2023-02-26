import React from "react";

import Typography from "../Typography";
import ArrowRight from "../Icons/ArrowRight";

import { CardWrapper, InfoWrapper, ContentWrapper } from "./styled";

function StatisticsCard({
  icon, header, text, className, to, ...props
}) {
  return (
    <CardWrapper className={`statistics-card ${className}`} to={to} {...props}>
      <ContentWrapper flexStart>
        {icon}
        <InfoWrapper>
          <Typography color="muted" variant="helpText" uppercase>
            {header}
          </Typography>
          <Typography variant="h6">{text}</Typography>
        </InfoWrapper>
      </ContentWrapper>
      {to && (
        <ContentWrapper>
          <ArrowRight color="icon" />
        </ContentWrapper>
      )}
    </CardWrapper>
  );
}

StatisticsCard.defaultProps = {
  color: "white",
};

export default StatisticsCard;
