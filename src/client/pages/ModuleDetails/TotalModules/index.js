import React, { useContext } from 'react';

import AppContext from 'src/AppContext';
import NofileIcon from 'Components/Icons/NoFile';
import Table from 'Components/Table';
import Empty from 'Components/Empty';

const headers = [
  { key: 'name', header: 'Name', sort: true },
  { key: 'size', header: 'Size', fileSize: true, sort: true },
];

const ModuleDetails = () => {
  const { stateData } = useContext(AppContext);
  const modulesList = stateData.modules;

  if (!modulesList.length) {
    return (
      <Empty message="No Modules Found">
        <NofileIcon width="3rem" />
      </Empty>
    );
  }

  return (
    <Table
      searchKey="name"
      title={`All Modules (${modulesList.length})`}
      headers={headers}
      data={modulesList}
    />
  );
};

export default ModuleDetails;
