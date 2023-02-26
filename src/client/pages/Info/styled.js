import { NavLink } from "react-router-dom";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0 16px;
`;

export const InfoHeader = styled.div`
  display: flex;
  padding: 12px;
`;

export const InfoBody = styled.div`
  flex: 1;
  overflow: auto;

  .cards {
    display: block;
    overflow: auto;
  }
`;

export const ListWrapper = styled.div`
  margin-bottom: 18px;
`;

export const ListItem = styled(NavLink)`
  display: inline-flex;
  padding: 8px 16px;
  width: 120px;
  margin-right: 12px;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.palette.cardBorderColor};
  cursor: pointer;

  ${(props) =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}

  &.active, &:hover {
    background-color: ${(props) => props.theme.palette.hover};
  }
`;

export const ListInfo = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: 14px;
`;
