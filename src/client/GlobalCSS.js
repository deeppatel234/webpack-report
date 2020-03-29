import React from 'react';
import { Global, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const GlobalStyle = () => {
  const { typography, palette } = useTheme();

  return (
    <Global
      styles={css`
        body {
          ${typography.body}
          color: ${palette.text}
        }

        html,
        body,
        #root {
          height: 100%;
          width: 100%;
          margin: 0;
        }

        a {
          text-decoration: none;
          color: inherit;
        }
      `}
    />
  );
};

export default GlobalStyle;
