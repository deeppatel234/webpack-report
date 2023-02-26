import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import AppContext from "src/AppContext";
import Typography from "Components/Typography";
import Card from "Components/Card";
import Empty from "Components/Empty";

import WarningIcon from "Components/Icons/Warning";
import CloseCircleIcon from "Components/Icons/CloseCircle";

import { InfoWrapper, InfoHeader, InfoBody, ListItem, ListInfo } from "./styled";

function BadgeItem({ displayName, value, icon: Icon, ...props }) {
  return (
    <ListItem color="info" {...props}>
      <Icon width="1.5rem" />
      <ListInfo>
        <Typography color="muted" variant="helpText" uppercase>
          {displayName}
        </Typography>
        <Typography weight="600">{value}</Typography>
      </ListInfo>
    </ListItem>
  );
}

function Info() {
  const { type } = useParams();
  const { stateData } = useContext(AppContext);

  if (!["errors", "warnings"].includes(type)) {
    return <Navigate to="/" />;
  }

  const infoList = stateData[type] || [];
  const color = type === "errors" ? "error" : "warning";

  console.log(JSON.stringify(infoList[1], null, 4));
  return (
    <InfoWrapper>
      <InfoHeader>
        <BadgeItem
          to="/info/errors"
          displayName="Errors"
          icon={CloseCircleIcon}
          color="error"
          value={stateData.errors.length}
        />
        <BadgeItem
          to="/info/warnings"
          displayName="Warnings"
          icon={WarningIcon}
          color="warning"
          value={stateData.warnings.length}
        />
      </InfoHeader>
      <InfoBody>
        {!infoList.length && <Empty message={`No ${type} found`} />}
        {infoList.map((info) => (
          <>
            {!info.htmlInfo ? (
              <Card
                key={info}
                borderColor={color}
                color={color}
                margin="6px 12px"
                className="cards pre-wrap"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {JSON.stringify(info, null, 4)}
              </Card>
            ) : (
              <Card
                key={info}
                borderColor={color}
                color={color}
                margin="6px 12px"
                className="cards"
                dangerouslySetInnerHTML={{ __html: info }}
              />
            )}
          </>
        ))}
      </InfoBody>
    </InfoWrapper>
  );
}

export default Info;
