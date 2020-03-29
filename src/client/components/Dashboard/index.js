import React, { useContext } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Header from 'Components/Header';
import Info from 'Components/Info';
import AppContext from 'src/AppContext';

import StatisticsCard from 'UI/StatisticsCard';
import WarningIcon from 'UI/Icons/Warning';
import CloseCircleIcon from 'UI/Icons/CloseCircle';

import { DashboardWrapper } from './styled';

const Dashboard = () => {
  const { stateData } = useContext(AppContext);
  const { errors, warnings } = stateData;

  return (
    <>
      <StatisticsCard
        to="/info/warnings"
        icon={<WarningIcon width="2.3rem" />}
        color="warning"
        header="Warnings"
        text={warnings.length}
        width="200px"
      />
      <StatisticsCard
        to="/info/errors"
        icon={<CloseCircleIcon width="2.3rem" />}
        color="error"
        header="Errors"
        text={errors.length}
        width="200px"
      />
    </>
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
