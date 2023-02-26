import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Card from "../Card";

export const CardWrapper = styled(Card)`
  display: inline-flex;
  justify-content: space-between;
  padding: 15px 24px;
`;

export const InfoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: 14px;

  h6 {
    font-size: 1rem;
  }
`;

export const ContentWrapper = styled.div`
  display: inline-flex;

  ${(props) =>
    props.flexStart &&
    css`
      align-items: flex-start;
    `}
`;
