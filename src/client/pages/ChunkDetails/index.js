import React, { useContext, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import AppContext from "src/AppContext";
import { size } from "src/utils";

import Typography from "Components/Typography";
import SizeChart from "Components/SizeChart";
import Modal from "Components/Modal";
import Table from "Components/Table";
import GraphWarning from "Components/GraphWarning";

import {
  DetailsTable,
  ChunkLink,
  DetailsWrapper,
  SideBar,
  Body,
  Title,
  ChunkWrapper,
} from "Components/Styles";

import ModuleTable from "../ModuleDetails/ModuleTable";

import { ListItem, InfoWrapper } from "./styled";

const originHeader = [
  { key: "moduleName", header: "Module Name", sort: true },
  {
    key: "request",
    header: "Request",
    sort: true,
  },
  {
    key: "loc",
    header: "LOC",
  },
];

function ChunkDetails() {
  const { id } = useParams();
  const [chunkId, setChunkID] = useState(id);
  const [modalData, setModalData] = useState({ visible: false });
  const { stateData } = useContext(AppContext);
  const { chunks } = stateData;

  useEffect(() => {
    setChunkID(id);
  }, [id]);

  const chunkData = chunks.find((c) => `${c.id}` === `${chunkId}`);

  if (typeof id === "undefined" || !chunkData) {
    return <Navigate to={`/chunks/${chunks[0].id}`} />;
  }

  const onClickOrigin = () => {
    setModalData({
      visible: true,
    });
  };

  const onCloseOrigin = () => {
    setModalData({
      visible: false,
    });
  };

  return (
    <DetailsWrapper>
      <Modal visible={modalData.visible} onClose={onCloseOrigin}>
        <Modal.Body minWidth="700">
          {modalData.visible && (
            <Table
              title="Origins"
              searchKey="moduleName"
              headers={originHeader}
              data={chunkData.origins}
            />
          )}
        </Modal.Body>
        <Modal.Footer center>
          <Modal.FooterButton onClick={onCloseOrigin}>Close</Modal.FooterButton>
        </Modal.Footer>
      </Modal>
      <SideBar>
        <Title variant="h5">Chunks</Title>
        {chunks.map(({ id: key, size: fileSize, names }) => (
          <ListItem
            key={key}
            active={`${key}` === `${chunkId}`}
            onClick={() => setChunkID(key)}
          >
            <InfoWrapper>
              <Typography color="info">{key}</Typography>
              <Typography weight="600" color="info">
                {size(fileSize)}
              </Typography>
            </InfoWrapper>
            <Typography varient="helpText">{names.join(" ")}</Typography>
          </ListItem>
        ))}
      </SideBar>
      <Body>
        <GraphWarning
          id={`chunk-id-${chunkId}`}
          dataLength={chunkData.modules.length}
        >
          <SizeChart id={`chunk-id-${chunkId}`} data={chunkData.modules} />
        </GraphWarning>
        <DetailsTable margin="16px 0 30px 0">
          <tr>
            <th>id</th>
            <td>{chunkData.id}</td>
            <th>initial</th>
            <td>{chunkData.initial ? "Yes" : "No"}</td>
            <th>entry</th>
            <td>{chunkData.entry ? "Yes" : "No"}</td>
            <th>size</th>
            <td>{size(chunkData.size)}</td>
          </tr>
          <tr>
            <th>files</th>
            <td colSpan="5">{chunkData.files.join(" , ")}</td>
            <th>hash</th>
            <td>{chunkData.hash}</td>
          </tr>
          <tr>
            <th>children</th>
            <td colSpan="3">
              <div>
                <ChunkWrapper>
                  {chunkData.children.map((c) => (
                    <ChunkLink to={`/chunks/${c}`}>{c}</ChunkLink>
                  ))}
                </ChunkWrapper>
              </div>
            </td>
            <th>parents</th>
            <td colSpan="3">
              <ChunkWrapper>
                {chunkData.parents.map((c) => (
                  <ChunkLink to={`/chunks/${c}`}>{c}</ChunkLink>
                ))}
              </ChunkWrapper>
            </td>
          </tr>
          <tr>
            <th>siblings</th>
            <td colSpan="3">
              <ChunkWrapper>
                {chunkData.siblings.map((c) => (
                  <ChunkLink to={`/chunks/${c}`}>{c}</ChunkLink>
                ))}
              </ChunkWrapper>
            </td>
            <th>origins</th>
            <td colSpan="3">
              <Typography color="info" cursor="pointer" onClick={onClickOrigin}>
                show origins
              </Typography>
            </td>
          </tr>
        </DetailsTable>
        <ModuleTable
          title={`Modules (${chunkData.modules.length})`}
          data={chunkData.modules}
        />
      </Body>
    </DetailsWrapper>
  );
}

export default ChunkDetails;
