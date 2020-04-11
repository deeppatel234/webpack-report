import React, { useState } from 'react';

import Table from 'Components/Table';
import Typography from 'Components/Typography';
import Modal from 'Components/Modal';

import InfoIcon from 'Components/Icons/Info';

import { ModuleDetailsTable, ChunkLink, CloseButton } from './styled';

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

const reasonHeader = [
  { key: 'moduleName', header: 'Module Name', sort: true },
  {
    key: 'type',
    header: 'Type',
    sort: true,
  },
  {
    key: 'userRequest',
    header: 'User Request',
    sort: true,
  },
  {
    key: 'loc',
    header: 'LOC',
  },
];

const ModuleDetails = ({ rowData, onClickReason }) => {
  return (
    <div>
      <ModuleDetailsTable>
        <tr>
          <th>id</th>
          <td>{rowData.id}</td>
          <th>built</th>
          <td>{rowData.built ? 'Yes' : 'No'}</td>
          <th>cacheable</th>
          <td>{rowData.cacheable ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <th>chunks</th>
          <td colSpan="3">
            {[1, 44, 32, 2].map(n => (
              <ChunkLink to={`/chunks/${n}`}>{n}</ChunkLink>
            ))}
          </td>
          {/* <td colSpan="3">{rowData.chunks.join(' ')}</td> */}
          <th>prefetched</th>
          <td>{rowData.prefetched ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <th>issuer</th>
          <td colSpan="5">{rowData.issuer}</td>
        </tr>
        <tr>
          <th>issuer name</th>
          <td colSpan="5">{rowData.issuerName}</td>
        </tr>
        <tr>
          <th>reasons</th>
          <td colSpan="5">
            <Typography
              color="info"
              cursor="pointer"
              onClick={() => onClickReason(rowData.reasons)}
            >
              show reasons
            </Typography>
          </td>
        </tr>
      </ModuleDetailsTable>
    </div>
  );
};

const ModuleTable = props => {
  const [modalData, setModalData] = useState({ visible: false, data: [] });

  const onClickReason = reasons => {
    setModalData({
      visible: true,
      data: reasons,
    });
  };

  const onCloseReason = () => {
    setModalData({
      visible: false,
      data: [],
    });
  };

  return (
    <>
      <Modal visible={modalData.visible} onClose={onCloseReason}>
        <Modal.Body>
          {modalData.visible && (
            <Table
              title="Reasons"
              searchKey="moduleName"
              headers={reasonHeader}
              data={modalData.data}
            />
          )}
        </Modal.Body>
        <Modal.Footer reverse>
          <CloseButton onClick={onCloseReason}>Close</CloseButton>
        </Modal.Footer>
      </Modal>

      <Table
        searchKey="name"
        headers={headers}
        subRow={ModuleDetails}
        subRowProps={{ onClickReason }}
        {...props}
      />
    </>
  );
};

export default ModuleTable;
