import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "Components/Header";

import Dashboard from "./Dashboard";
import Info from "./Info";
import AssetsDetails from "./AssetsDetails";
import ModuleDetails from "./ModuleDetails";
import ChunkDetails from "./ChunkDetails";
import TotalModles from "./ModuleDetails/TotalModules";
import NodeModules from "./ModuleDetails/NodeModules";
import DuplicateModules from "./ModuleDetails/DuplicateModules";

import { PageWrapper } from "./styled";

function Pages() {
  return (
    <PageWrapper>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/info/:type" element={<Info />} />
          <Route path="/assets/:type?" element={<AssetsDetails />} />
          <Route path="/modules" element={<ModuleDetails />}>
            <Route path="all" element={<TotalModles />} />
            <Route path="node-modules" element={<NodeModules />} />
            <Route path="duplicate-modules" element={<DuplicateModules />} />
            <Route index element={<Navigate to="/modules/all" />} />
            <Route path="*" element={<Navigate to="/modules/all" />} />
          </Route>
          <Route path="/chunks/:id?" element={<ChunkDetails />} />
        </Routes>
      </HashRouter>
    </PageWrapper>
  );
}

export default Pages;
