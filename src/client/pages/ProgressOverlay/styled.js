import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #212121;
  color: rgba(255, 255, 255, 0.7);
`;

export const ProgressTitle = styled.p`
  display: flex;
  font-size: 3rem;
  font-weight: 300;
  width: 100%;
  margin: 8px 0;
`;

export const ProgressCount = styled.p`
  width: 40%;
  text-align: right;
  margin: 16px;
`;

export const ProgressMessage = styled.p`
  width: 60%;
  border-left: 4px solid #424242;
  margin: 16px;
  padding-left: 32px;
`;
