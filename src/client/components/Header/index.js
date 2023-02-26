import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "src/AppContext";
import AppThemeContext from "src/AppThemeContext";
import Typography from "Components/Typography";
import LightThemeIcon from "Components/Icons/LightTheme";
import DarkThemeIcon from "Components/Icons/DarkTheme";

import {
  HeaderWrapper,
  HeaderCol,
  ProjectName,
  VersionName,
  ThemeButton,
  NavLinks,
} from "./styled";

function Header() {
  const { packageJson } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(AppThemeContext);
  const { name, version } = packageJson;

  return (
    <HeaderWrapper>
      <HeaderCol>
        <Link to="/">
          <Typography color="white">Webpack Report</Typography>
        </Link>
        {name && (
          <>
            <ProjectName color="white">{name}</ProjectName>
            <VersionName color="white" variant="subText">
              v {version}
            </VersionName>
          </>
        )}
      </HeaderCol>
      <HeaderCol>
        <NavLinks to="/">Dashboard</NavLinks>
        <NavLinks to="/assets">Assets</NavLinks>
        <NavLinks to="/modules">Modules</NavLinks>
        <NavLinks to="/chunks">Chunks</NavLinks>
        <ThemeButton onClick={toggleTheme}>
          {theme === "light" ? (
            <LightThemeIcon color="white" width="1.5rem" />
          ) : (
            <DarkThemeIcon color="white" width="1.5rem" />
          )}
        </ThemeButton>
      </HeaderCol>
    </HeaderWrapper>
  );
}

export default Header;
