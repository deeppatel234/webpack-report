import React, { useContext } from "react";
import AppContext from "../../AppContext";

import { Wrapper, ProgressTitle, ProgressMessage, ProgressCount } from "./styled";

function ProgressOverlay() {
  const { progress = {} } = useContext(AppContext);
  const { percentage, message } = progress;

  return (
    <Wrapper>
      <ProgressTitle>
        <ProgressCount>{percentage}%</ProgressCount>
        <ProgressMessage>{message || "Loading"}</ProgressMessage>
      </ProgressTitle>
    </Wrapper>
  );
}

export default ProgressOverlay;
