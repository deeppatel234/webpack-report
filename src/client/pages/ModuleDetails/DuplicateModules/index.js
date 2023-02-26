import React, { useContext } from "react";

import AppContext from "src/AppContext";

import BaseModules from "../BaseModules";

function DuplicateModules() {
  const { stateData } = useContext(AppContext);
  const { modules } = stateData;

  const list = modules.filter((m) => m.chunks && m.chunks.length > 1);

  return <BaseModules modules={list} moduleString="Duplicate Modules" />;
}

export default DuplicateModules;
