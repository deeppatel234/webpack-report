import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Header from 'Components/Header';

import Dashboard from './Dashboard';
import Info from './Info';
import AssetsDetails from './AssetsDetails';

import { PageWrapper } from './styled';

const Pages = () => {
  return (
    <PageWrapper>
      <HashRouter>
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/info/:type" component={Info} />
        <Route exact path="/assets/:type" component={AssetsDetails} />
      </HashRouter>
    </PageWrapper>
  );
};

export default Pages;
