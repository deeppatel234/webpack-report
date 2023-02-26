import React from "react";

import { Element } from "./styled";

const defaultElementMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

const DEFAULT_ELEMENT = "span";

function Typography({ element, variant, ...props }) {
  return (
    <Element
      as={element || defaultElementMapping[variant] || DEFAULT_ELEMENT}
      variant={variant}
      {...props}
    />
  );
}

export default Typography;
