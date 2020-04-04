import styled from '@emotion/styled';

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.palette.background};

  .javascript {
    color: #f0db4f;
  }

  .css {
    color: #264de4;
  }
`;

export const DashboardBody = styled.div`
  flex: 1;
  overflow: auto;
`;
