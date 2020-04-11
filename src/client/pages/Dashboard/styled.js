import styled from '@emotion/styled';
import Typography from 'Components/Typography';

export const DashboardBody = styled.div`
  flex: 1;
  overflow: auto;
`;

export const StatisticsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 8px 0;

  .statistics-card {
    width: 26%;
    min-width: 220px;
    max-width: 350px;
    margin: 4px;
  }
`;

export const StatisticsTitle = styled(Typography)`
  padding: 8px 20px;
  margin: 0 30px;
  border-bottom: 1px solid ${props => props.theme.rgbaColor(0.04)};
`;

export const DetailsCard = styled.div`
  display: flex;
  margin: 20px 30px;
`;

export const InfoButton = styled.span`
  margin: 0 10px;
  color: ${props => props.theme.palette.info};
  cursor: pointer;
`;

export const DetailsTable = styled.table`
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
