import styled from '@emotion/styled';

export const AlertWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  border-radius: 3px;
  padding: 10px;
  background-color: ${props => props.theme.palette.info};
  cursor: pointer;
`;

export const AlertButton = styled.span`
  text-decoration: underline;
`;
