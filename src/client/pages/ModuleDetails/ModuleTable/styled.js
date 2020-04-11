import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const CloseButton = styled.button`
  background: ${props => props.theme.palette.info};
  padding: 8px 24px;
  color: ${props => props.theme.palette.white};
  border: 0;
  border-radius: 3px;
  cursor: pointer;
`;

export const ModuleDetailsTable = styled.table`
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid ${props => props.theme.rgbaColor(0.04)};

    &:first-of-type {
      border-top: 1px solid ${props => props.theme.rgbaColor(0.04)};
    }
  }

  td {
    word-break: unset;
  }

  th {
    white-space: nowrap;
    background: ${props => props.theme.rgbaColor(0.04)};
  }

  th,
  td {
    padding: 8px;

    &:first-child {
      border-left: 1px solid ${props => props.theme.rgbaColor(0.04)};
    }

    &:last-child {
      border-right: 1px solid ${props => props.theme.rgbaColor(0.04)};
    }
  }
`;

export const ChunkLink = styled(Link)`
  margin: 0 4px;
  padding: 4px 8px;
  border-radius: 3px;
  color: ${props => props.theme.palette.white};
  background: ${props => props.theme.palette.info};
`;
