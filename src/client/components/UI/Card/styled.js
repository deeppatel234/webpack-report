import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Card = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid ${props => props.theme.palette.cardBorderColor};
  margin: 12px;
  background-color: ${props => props.theme.palette.cardBackground};

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
