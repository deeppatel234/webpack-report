import styled from '@emotion/styled';
import Typography from '../UI/Typography';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.palette.headerBackground};
  padding: 8px 14px;
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

export const ThemeButton = styled.div`
  padding: 4px;
  border-radius: 50%;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

