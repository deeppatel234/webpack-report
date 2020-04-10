import React from 'react';

import Table from 'Components/Table';

import InfoIcon from 'Components/Icons/Info';

const headers = [
  { key: 'name', header: 'Name', sort: true },
  {
    key: 'size',
    header: 'Size',
    fileSize: true,
    sort: true,
    className: 'size-column',
  },
  {
    key: 'info',
    render: () => <InfoIcon />,
    className: 'info-column',
  },
];

const ModuleDetails = () => {
  return <div>summery</div>;
};

const ModuleTable = props => {
  return (
    <Table
      searchKey="name"
      headers={headers}
      subRow={ModuleDetails}
      {...props}
    />
  );
};

export default ModuleTable;
