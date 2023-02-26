import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const TableWrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
`;

export const TableElement = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;

  th {
    text-align: left;
    padding: 12px;
  }

  td {
    text-align: left;
    padding: 12px;
    word-break: break-all;
  }

  thead {
    tr {
      border-bottom: 2px solid ${(props) => props.theme.rgbaColor(0.4)};
    }
  }

  .underline {
    text-decoration: underline;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  ${(props) =>
    props.sort &&
    css`
      cursor: pointer;
    `}
`;

export const TableRow = styled.tr`
  ${(props) =>
    !props.noBorder &&
    css`
      border-bottom: 1px solid ${props.theme.rgbaColor(0.12)};
    `}

  ${(props) =>
    props.clickable &&
    css`
      cursor: pointer;
    `}

  ${(props) =>
    props.isSubRowOpen &&
    css`
      border-bottom: none;
    `}

  ${(props) =>
    !props.disableHover &&
    css`
      &:hover {
        background-color: ${props.theme.rgbaColor(0.12)};
      }
    `}
`;

export const SubRowWrapper = styled.td`
  width: 100%;
  padding: 32px 18px;
  background-color: ${(props) => props.theme.rgbaColor(0.04)};
`;
