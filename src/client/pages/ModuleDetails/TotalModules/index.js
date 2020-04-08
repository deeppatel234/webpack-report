import React, { useContext, useState } from 'react';

import AppContext from 'src/AppContext';
import NofileIcon from 'Components/Icons/NoFile';
import Table from 'Components/Table';
import Empty from 'Components/Empty';

import JavascriptIcon from 'Components/Icons/Javascript';
import CSSIcon from 'Components/Icons/CSS';
import FileIcon from 'Components/Icons/File';

import Typography from 'Components/Typography';

import { Wrapper, ListWrapper, ListItem, InfoWrapper } from './styled';

const headers = [
  { key: 'name', header: 'Name', sort: true },
  { key: 'chunks', header: 'Chunks', sort: true },
  { key: 'size', header: 'Size', fileSize: true, sort: true },
];

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
  '.js': 'Javascript',
  '.css': 'CSS',
};

const ModuleDetails = () => {
  const [activeFilter, setFilter] = useState('');
  const { stateData } = useContext(AppContext);
  const { modules } = stateData;

  if (!modules.length) {
    return (
      <Empty message="No Modules Found">
        <NofileIcon width="3rem" />
      </Empty>
    );
  }

  const jsModulesLength = modules.filter(m => m.name.endsWith('.js')).length;
  const cssModulesLength = modules.filter(m => m.name.endsWith('.css')).length;

  const filteredData = activeFilter
    ? modules.filter(m => m.name.endsWith(activeFilter))
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
          active={activeFilter === '.js'}
          displayName="Javascript"
          value={jsModulesLength}
          icon={JavascriptIcon}
          className="javascript"
          onClick={() => setFilter('.js')}
        />
        <BadgeItem
          active={activeFilter === '.css'}
          displayName="CSS"
          value={cssModulesLength}
          icon={CSSIcon}
          className="css"
          onClick={() => setFilter('.css')}
        />
      </ListWrapper>
      <Table
        searchKey="name"
        title={`${title[activeFilter] || 'All'} Modules`}
        headers={headers}
        data={filteredData}
      />
    </Wrapper>
  );
};

export default ModuleDetails;
