import React, { useContext, useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';

import AppContext from 'src/AppContext';
import NofileIcon from 'Components/Icons/NoFile';
import Table from 'Components/Table';
import Empty from 'Components/Empty';
import SizeChart from 'Components/SizeChart';

import { size } from 'src/utils';

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
    className: 'underline',
    render: ({ data }) => `${data.length}`,
  },
  { key: 'size', header: 'Size', fileSize: true, sort: true },
];

const moduleHeaders = [
  {
    key: 'name',
    header: 'Name',
    sort: true,
  },
  { key: 'size', header: 'Size', fileSize: true, sort: true },
];

const Modules = ({ rowData }) => {
  return (
    <Table
      searchKey="name"
      title={`${rowData.name} (${rowData.modules.length})`}
      headers={moduleHeaders}
      data={rowData.modules}
    />
  );
};

const ModuleSummary = ({ tableData }) => {
  const totalSize = tableData.reduce((acc, t) => acc + t.size, 0);
  return (
    <tr>
      <th colSpan="2">Total</th>
      <th colSpan="1">{size(totalSize)}</th>
    </tr>
  );
};

const ModuleDetails = () => {
  const { stateData } = useContext(AppContext);
  const [list, setList] = useState([]);
  const { packageSize, moduleState } = stateData;

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

  return (
    <>
      <SizeChart id="node_modules" data={list} />
      <Table
        searchKey="name"
        title={`Node Modules (${moduleState.totalPackagesModule} - ${moduleState.totalPackages} packages)`}
        subRow={Modules}
        summary={ModuleSummary}
        headers={headers}
        data={list}
      />
    </>
  );
};

export default ModuleDetails;
