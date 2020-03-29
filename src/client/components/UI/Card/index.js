import React from 'react';

import { CardElement, CardLinkElement } from './styled';

const Card = ({ to, ...props }) => {
  return to ? (
    <CardLinkElement to={to} {...props} />
  ) : (
    <CardElement {...props} />
  );
};

Card.defaultProps = {
  color: 'white',
};

export default Card;
