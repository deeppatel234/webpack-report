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
    color: #25a1e1;
  }

  .nodejs {
    color: #6cc24a;
  }

  .size-graph {
    padding-bottom: 24px;
  }

  .size-column {
    white-space: nowrap;
  }

  .info-column {
    text-align: right;
  }

  .link-column {
    text-align: right;
    text-decoration: underline;
    color: ${props => props.theme.palette.info};
  }
`;
