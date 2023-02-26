import React from "react";
import { Global, css, useTheme } from "@emotion/react";

function GlobalStyle() {
  const { typography, palette, rgbaColor } = useTheme();

  return (
    <Global
      styles={css`
        body {
          ${typography.body}
          color: ${palette.text};
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

        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: ${rgbaColor(0.12)};
        }

        *::-webkit-scrollbar-thumb {
          border-radius: 8px;
          background-color: ${rgbaColor(0.5)};
        }
      `}
    />
  );
}

export default GlobalStyle;
