import React from 'react';
import { Global, css } from '@emotion/core';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        body {
          font-family: 'Montserrat', sans-serif;
        }

        html,
        body,
        #root {
          height: 100%;
          width: 100%;
          margin: 0;
        }
      `}
    />
  );
};

export default GlobalStyle;
