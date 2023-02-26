import React, { useContext, useState } from "react";

import AppContext from "src/AppContext";

import StatisticsCard from "Components/StatisticsCard";
import WarningIcon from "Components/Icons/Warning";
import CloseCircleIcon from "Components/Icons/CloseCircle";
import TimeIcon from "Components/Icons/Time";
import FileIcon from "Components/Icons/File";
import NodeJSIcon from "Components/Icons/NodeJS";
import DuplicateIcon from "Components/Icons/Duplicate";
import Modal from "Components/Modal";
import Table from "Components/Table";

import { DetailsTable, WordBreak } from "Components/Styles";

import { ASSETS_TYPE } from "src/const";

import { size, timeConversion } from "src/utils";

import {
  DashboardBody,
  StatisticsWrapper,
  StatisticsTitle,
  DetailsCard,
  InfoButton,
} from "./styled";

const detailsHeaders = [
  { key: "name", header: "Name", sort: true },
  {
    key: "version",
    header: "Version",
  },
];

function Dashboard() {
  const [modalData, setModalData] = useState({
    visible: false,
    data: [],
    title: "",
  });
  const { packageJson, stateData } = useContext(AppContext);
  const { errors, warnings, time, assetsState, moduleState, builtAt } = stateData;

  const onClickDetails = (data, title) => {
    setModalData({
      title,
      visible: true,
      data: Object.keys(data).map((d) => ({ name: d, version: data[d] })),
    });
  };

  const onCloseDetailsModal = () => {
    setModalData({
      visible: false,
      data: [],
    });
  };

  const formatedBuiltAt = builtAt ? new Date(builtAt).toLocaleString() : "";

  return (
    <DashboardBody>
      <Modal visible={modalData.visible} onClose={onCloseDetailsModal}>
        <Modal.Body minWidth="700">
          {modalData.visible && (
            <Table
              title={modalData.title}
              searchKey="name"
              headers={detailsHeaders}
              data={modalData.data}
            />
          )}
        </Modal.Body>
        <Modal.Footer center>
          <Modal.FooterButton onClick={onCloseDetailsModal}>Close</Modal.FooterButton>
        </Modal.Footer>
      </Modal>
      <DetailsCard>
        <DetailsTable>
          <tr>
            <th>Project Name</th>
            <td colSpan="2">{packageJson.name}</td>
            <th>Project Version</th>
            <td>{packageJson.version}</td>
            <th>License</th>
            <td>{packageJson.license}</td>
          </tr>
          <tr>
            <th>Dependencies</th>
            <td colSpan="2">
              {Object.keys(packageJson.dependencies).length}
              <InfoButton onClick={() => onClickDetails(packageJson.dependencies, "Dependencies")}>
                details
              </InfoButton>
            </td>
            <th>Webpack Version</th>
            <td>{stateData.version}</td>
            <th>Built At</th>
            <td>{formatedBuiltAt}</td>
          </tr>
          <tr>
            <th>Dev Dependencies</th>
            <td colSpan="2">
              {Object.keys(packageJson.devDependencies).length}
              <InfoButton
                onClick={() => onClickDetails(packageJson.devDependencies, "Dev Dependencies")}
              >
                details
              </InfoButton>
            </td>
            <th>Output Path</th>
            <td>
              <WordBreak>{stateData.outputPath}</WordBreak>
            </td>
            <th>Hash</th>
            <td>{stateData.hash}</td>
          </tr>
        </DetailsTable>
      </DetailsCard>
      <StatisticsWrapper>
        <StatisticsCard
          to="/info/warnings"
          icon={<WarningIcon width="2rem" />}
          color="warning"
          header="Warnings"
          text={warnings.length}
        />
        <StatisticsCard
          to="/info/errors"
          icon={<CloseCircleIcon width="2rem" />}
          color="error"
          header="Errors"
          text={errors.length}
        />
        <StatisticsCard
          icon={<TimeIcon width="2rem" />}
          color="info"
          header="Build Time"
          text={timeConversion(time)}
        />
      </StatisticsWrapper>
      <StatisticsTitle variant="h6">Assets</StatisticsTitle>
      <StatisticsWrapper>
        {ASSETS_TYPE.map(({ key, displayName, icon: Icon, iconWidth = "2rem", ...props }) => (
          <StatisticsCard
            key={key}
            to={`/assets/${key}`}
            icon={<Icon width={iconWidth} />}
            text={size(assetsState[key].size)}
            color="info"
            {...props}
            header={displayName}
          />
        ))}
      </StatisticsWrapper>
      <StatisticsTitle variant="h6">Modules</StatisticsTitle>
      <StatisticsWrapper>
        <StatisticsCard
          to="/modules/all"
          icon={<FileIcon width="2rem" />}
          text={moduleState.totalModules}
          color="info"
          header="All Modules"
        />
        <StatisticsCard
          to="/modules/node-modules"
          icon={<NodeJSIcon width="2rem" />}
          text={`${moduleState.totalPackagesModule} (${moduleState.totalPackages})`}
          className="nodejs"
          header="Node Modules"
        />
        <StatisticsCard
          to="/modules/duplicate-modules"
          icon={<DuplicateIcon width="2rem" />}
          text={moduleState.duplicateModules}
          color="info"
          header="Duplicate Modules"
        />
      </StatisticsWrapper>
    </DashboardBody>
  );
}

export default Dashboard;
