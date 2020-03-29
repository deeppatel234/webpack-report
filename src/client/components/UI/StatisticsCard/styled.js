import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Card from '../Card';

export const CardWrapper = styled(Card)`
  display: inline-flex;
  justify-content: space-between;
  padding: 18px 24px;
`;

export const InfoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: 14px;
`;

export const ContentWrapper = styled.div`
  display: inline-flex;

  ${props => props.flexStart && css`
    align-items: flex-start;
  `}
`;
