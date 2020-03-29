import styled from '@emotion/styled';
import Typography from '../UI/Typography';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3d4977;
  color: white;
  padding: 14px;
  font-size: 0.9rem;
`;

export const HeaderCol = styled.div``;

export const ProjectName = styled(Typography)`
  margin-left: 16px;
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  padding-left: 16px;
`;

export const VersionName = styled(Typography)`
  margin-left: 8px;
`;
