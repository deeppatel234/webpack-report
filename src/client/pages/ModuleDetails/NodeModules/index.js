import React, { useContext, useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';

import AppContext from 'src/AppContext';
import NofileIcon from 'Components/Icons/NoFile';
import Table from 'Components/Table';
import Empty from 'Components/Empty';
import SizeChart from 'Components/SizeChart';

const headers = [
  {
    key: 'name',
    header: 'Name',
    sort: true,
  },
  {
    key: 'modules',
    header: 'Modules',
    sort: true,
    render: ({ data }) => `${data.length}`,
  },
  { key: 'size', header: 'Size', fileSize: true, sort: true },
];

const ModuleDetails = () => {
  const { stateData } = useContext(AppContext);
  const [list, setList] = useState([]);
  const { packageSize } = stateData;

  useEffect(() => {
    if (!_isEmpty(packageSize)) {
      setList(
        Object.keys(packageSize).map(key => {
          return {
            name: key,
            modules: packageSize[key].modules,
            size: packageSize[key].totalSize,
          };
        }),
      );
    }
  }, []);

  if (_isEmpty(list)) {
    return (
      <Empty message="No Node Modules Found">
        <NofileIcon width="3rem" />
      </Empty>
    );
  }

  const packageJsonLength = Object.keys(packageSize).length;
  const packageJsonModules = Object.keys(packageSize).reduce((acc, key) => {
    return acc + packageSize[key].modules.length;
  }, 0);

  return (
    <>
      <SizeChart id="node_modules" data={list} />
      <Table
        searchKey="name"
        title={`Node Modules (${packageJsonModules} - ${packageJsonLength} packages)`}
        headers={headers}
        data={list}
      />
    </>
  );
};

export default ModuleDetails;
