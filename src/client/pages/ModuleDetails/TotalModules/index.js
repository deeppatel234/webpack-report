import React, { useContext } from "react";

import AppContext from "src/AppContext";

import BaseModules from "../BaseModules";

function TotalModules() {
  const { stateData } = useContext(AppContext);
  const { modules } = stateData;

  return <BaseModules modules={modules} />;
}

export default TotalModules;
