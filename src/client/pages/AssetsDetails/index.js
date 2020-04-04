import React, { useContext } from 'react';
import AppContext from 'src/AppContext';


const AssetsDetails = ({ match }) => {
  const { stateData } = useContext(AppContext);
  const {
    params: { type },
  } = match;

  return <div>{type}</div>;
};

export default AssetsDetails;
