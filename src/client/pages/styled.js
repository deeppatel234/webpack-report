import styled from '@emotion/styled';

export const PageWrapper = styled.div`
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

  .nodejs {
    color: #6cc24a;
  }

  .size-graph {
    padding-bottom: 24px;
  }
`;
