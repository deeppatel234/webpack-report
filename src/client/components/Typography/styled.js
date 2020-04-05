import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Element = styled.p`
  margin: 0;
  ${props => (props.variant ? props.theme.typography[props.variant] : '')};
  ${props =>
    props.truncate &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
  ${props =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}

  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `}

  ${props =>
    props.display &&
    css`
      display: ${props.display};
    `}

  ${props =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}

  ${props =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
`;

export default Element;
