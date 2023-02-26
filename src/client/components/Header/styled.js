import { NavLink } from "react-router-dom";

import styled from "@emotion/styled";
import Typography from "Components/Typography";

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.palette.headerBackground};
  padding: 8px 14px;
  font-size: 0.9rem;
`;

export const HeaderCol = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectName = styled(Typography)`
  margin-left: 16px;
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  padding-left: 16px;
`;

export const VersionName = styled(Typography)`
  margin-left: 8px;
`;

export const ThemeButton = styled.div`
  padding: 4px;
  margin-left: 16px;
  border-radius: 50%;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

export const NavLinks = styled(NavLink)`
  position: relative;
  text-transform: uppercase;
  margin: 0 12px;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  transition: all 250ms;
  color: ${(props) => props.theme.palette.white};

  &:hover {
    color: ${(props) => props.theme.palette.info};
  }

  &.active {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      top: 100%;
      left: 0;
      background: ${(props) => props.theme.palette.info};
    }
  }
`;
