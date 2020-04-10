import React, { useState } from 'react';

import NofileIcon from 'Components/Icons/NoFile';
import Empty from 'Components/Empty';

import JavascriptIcon from 'Components/Icons/Javascript';
import CSSIcon from 'Components/Icons/CSS';
import FileIcon from 'Components/Icons/File';

import Typography from 'Components/Typography';

import ModuleTable from '../ModuleTable';

import { Wrapper, ListWrapper, ListItem, InfoWrapper } from './styled';

const BadgeItem = ({ displayName, value, icon: Icon, ...props }) => (
  <ListItem color="info" {...props}>
    <Icon width="1.5rem" />
    <InfoWrapper>
      <Typography color="muted" variant="helpText" uppercase>
        {displayName}
      </Typography>
      <Typography weight="600">{value}</Typography>
    </InfoWrapper>
  </ListItem>
);

const title = {
  js: 'Javascript',
  css: 'CSS',
};

const patters = {
  js: new RegExp('.(js|jsx)$'),
  css: new RegExp('.(css|less|scss)$'),
};

const BaseModules = ({ modules, moduleString = 'Modules' }) => {
  const [activeFilter, setFilter] = useState('');

  if (!modules.length) {
    return (
      <Empty message={`No ${moduleString} Found`}>
        <NofileIcon width="3rem" />
      </Empty>
    );
  }

  const jsModulesLength = modules.filter(m => patters.js.test(m.name)).length;
  const cssModulesLength = modules.filter(m => patters.css.test(m.name)).length;

  const filteredData = activeFilter
    ? modules.filter(m => patters[activeFilter].test(m.name))
    : modules;

  return (
    <Wrapper>
      <ListWrapper>
        <BadgeItem
          active={!activeFilter}
          displayName="All"
          value={modules.length}
          icon={FileIcon}
          onClick={() => setFilter(false)}
        />
        <BadgeItem
          active={activeFilter === 'js'}
          displayName="Javascript"
          value={jsModulesLength}
          icon={JavascriptIcon}
          className="javascript"
          onClick={() => setFilter('js')}
        />
        <BadgeItem
          active={activeFilter === 'css'}
          displayName="CSS"
          value={cssModulesLength}
          icon={CSSIcon}
          className="css"
          onClick={() => setFilter('css')}
        />
      </ListWrapper>
      <ModuleTable
        title={`${title[activeFilter] || 'All'} ${moduleString}`}
        data={filteredData}
      />
    </Wrapper>
  );
};

export default BaseModules;
