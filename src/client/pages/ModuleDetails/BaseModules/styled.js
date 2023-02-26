import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const ListWrapper = styled.div`
  margin-bottom: 18px;
`;

export const ListItem = styled.div`
  display: inline-flex;
  padding: 8px 16px;
  width: 120px;
  margin-right: 12px;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.palette.cardBorderColor};
  cursor: pointer;

  ${props =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}

  ${props =>
    props.active &&
    css`
      background-color: ${props.theme.palette.hover};
    `}

  &:hover {
    background-color: ${props => props.theme.palette.hover};
  }
`;

export const InfoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: 14px;
`;
