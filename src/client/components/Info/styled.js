import styled from '@emotion/styled';

export const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 16px 40px 0 40px;
`;

export const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.cardBorderColor};
  padding: 8px 16px;
  margin-bottom: 6px;

  svg {
    margin-right: 16px;
  }
`;

export const InfoBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
