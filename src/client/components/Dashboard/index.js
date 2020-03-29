import React from 'react';

import Header from '../Header';

import StatisticsCard from '../UI/StatisticsCard';
import WarningIcon from '../UI/Icons/Warning';
import CloseCircleIcon from '../UI/Icons/CloseCircle';

import { DashboardWrapper } from './styled';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Header />
      <StatisticsCard
        icon={<WarningIcon width="2.3rem" />}
        color="warning"
        header="Warnings"
        text="25"
        width="200px"
      />
      <StatisticsCard
        icon={<CloseCircleIcon width="2.3rem" />}
        color="error"
        header="Errors"
        text="25"
        width="200px"
      />
    </DashboardWrapper>
  );
};

export default Dashboard;
