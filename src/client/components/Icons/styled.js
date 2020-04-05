import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const IconSvg = styled.svg`
  ${props =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}
`;
