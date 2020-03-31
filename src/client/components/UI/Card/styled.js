import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const CardElement = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid ${props => props.theme.palette.cardBorderColor};
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

  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}

  ${props =>
    props.borderColor &&
    css`
      border-color: ${props.theme.palette[props.borderColor]};
    `}
`;

export const CardLinkElement = styled(Link)`
  display: inline-block;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid ${props => props.theme.palette.cardBorderColor};
  background-color: ${props => props.theme.palette.cardBackground};
  text-decoration: none;

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

  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}

  ${props =>
    props.borderColor &&
    css`
      border-color: ${props.theme.palette[props.borderColor]};
    `}
`;
