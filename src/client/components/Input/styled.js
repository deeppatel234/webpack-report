import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
  width: 100%;

  ${(props) => props.width &&
    css`
      width: ${props.width};
    `}
`;

export const AffixWrapper = styled.span`
  position: absolute;
  top: 50%;
  line-height: 0;
  transform: translateY(-50%);

  ${(props) => props.left &&
    css`
      left: 10px;
    `}
  ${(props) => props.right &&
    css`
      right: 10px;
    `}
`;

export const InputEle = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 0.8rem;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.palette.dark};
  border-bottom: 1px solid ${(props) => props.theme.rgbaColor(0.4)};
  outline: none;

  ${(props) => props.suffix &&
    css`
      padding-right: 32px;
    `}
  ${(props) => props.prefix &&
    css`
      padding-left: 32px;
    `}
`;
