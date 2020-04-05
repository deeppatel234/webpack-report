import styled from '@emotion/styled';

export const EmptyElement = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;

  color: ${props => props.theme.rgbaColor(0.4)};
`;

export const EmptyChildren = styled.div`
  margin-bottom: 16px;
`;
