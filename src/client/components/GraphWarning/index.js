import React, { useEffect, useState } from 'react';

import { AlertWrapper, AlertButton } from './styled';

const GraphWarning = ({ id, children, limit = 300, dataLength }) => {
  const [isRendred, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(dataLength <= limit);
  }, [id]);

  if (isRendred) {
    return children;
  }

  return (
    <AlertWrapper onClick={() => setIsRendered(true)}>
      Due to heavy data, graph is not rendered. click for render graph.
      <AlertButton>Show Graph</AlertButton>
    </AlertWrapper>
  );
};

export default GraphWarning;
