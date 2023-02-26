import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const ListItem = styled.div`
  min-width: 150px;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.palette.cardBorderColor};
  cursor: pointer;

  &:first-of-type {
    border-top: 1px solid ${(props) => props.theme.palette.cardBorderColor};
  }

  ${(props) =>
    props.active &&
    css`
      background-color: ${props.theme.palette.hover};
    `}

  &:hover {
    background-color: ${(props) => props.theme.palette.hover};
  }
`;

export const InfoWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
`;
