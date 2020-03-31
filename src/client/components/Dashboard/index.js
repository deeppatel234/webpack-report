import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Header from 'Components/Header';
import Info from 'Components/Info';
import Statistics from 'Components/Statistics';

import { DashboardWrapper, DashboardBody } from './styled';

const Dashboard = () => {
  return (
    <DashboardBody>
      <Statistics />
    </DashboardBody>
  );
};

export default () => {
  return (
    <DashboardWrapper>
      <Header />
      <HashRouter>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/info/:type" component={Info} />
      </HashRouter>
    </DashboardWrapper>
  );
};
