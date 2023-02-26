import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";

export const ListItem = styled(NavLink)`
  display: inline-flex;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.palette.cardBorderColor};
  cursor: pointer;

  &:first-of-type {
    border-top: 1px solid ${(props) => props.theme.palette.cardBorderColor};
  }

  ${(props) =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}

  &.active, &:hover {
    background-color: ${(props) => props.theme.palette.hover};
  }
`;

export const InfoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: 14px;
`;
