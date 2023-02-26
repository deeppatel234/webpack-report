import React from "react";

import { IconSvg } from "./styled";

function Icon({ children, className, ...props }) {
  return (
    <IconSvg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      {children}
    </IconSvg>
  );
}

Icon.defaultProps = {
  fill: "currentColor",
  width: "1em",
  className: "",
};

export default Icon;
