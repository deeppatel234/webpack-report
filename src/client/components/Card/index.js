import React from "react";

import { CardElement, CardLinkElement } from "./styled";

function Card({ to, ...props }) {
  return to ? (
    <CardLinkElement to={to} {...props} />
  ) : (
    <CardElement {...props} />
  );
}

Card.defaultProps = {
  color: "white",
};

export default Card;
