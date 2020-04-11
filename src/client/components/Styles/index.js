import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

import { Link } from 'react-router-dom';
import Typography from 'Components/Typography';

export const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-right: 1px solid ${props => props.theme.palette.cardBorderColor};
`;

export const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding: 32px;
`;

export const Title = styled(Typography)`
  padding: 16px;
`;

export const DetailsTable = styled.table`
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;

  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}

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

export const ChunkWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ChunkLink = styled(Link)`
  margin: 4px;
  padding: 4px 8px;
  border-radius: 3px;
  color: ${props => props.theme.palette.white};
  background: ${props => props.theme.palette.info};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0;
`;

export const Loader = styled.div`
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid ${props => props.theme.palette.info};
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`;
