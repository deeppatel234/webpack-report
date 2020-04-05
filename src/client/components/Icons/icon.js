import React from 'react';
import PropTypes from 'prop-types';

import { IconSvg } from './styled';

export const Icon = ({ children, className, ...props }) => {
  return (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {children}
    </IconSvg>
  );
};

Icon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  fill: 'currentColor',
  width: '1em',
  className: '',
};

export default Icon;
