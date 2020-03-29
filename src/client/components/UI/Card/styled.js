import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Card = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin: 12px;

  ${props =>
    props.background &&
    css`
      background-color: ${props.theme.palette[props.background]};
    `}

  ${props =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;
