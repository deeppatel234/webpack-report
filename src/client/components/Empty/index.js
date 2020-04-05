import React from 'react';

import Typography from 'Components/Typography';
import { EmptyElement, EmptyChildren } from './styled';

const Empty = ({
  variant = 'h4',
  message,
  children,
  messageProps,
  ...restProps
}) => (
  <EmptyElement {...restProps}>
    {children && <EmptyChildren>{children}</EmptyChildren>}
    <Typography variant={variant} {...messageProps}>
      {message}
    </Typography>
  </EmptyElement>
);

export default Empty;
