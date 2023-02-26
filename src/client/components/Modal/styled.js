import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

const blowUpModal = keyframes`

  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const BodyWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.3s;
  ${(props) =>
    props.position === "top" &&
    css`
      align-items: start;
      padding-top: 10%;
    `}

  &.modal-body-animation-exit {
    opacity: 1;
  }

  &.modal-body-animation-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 32px);
  max-height: 80%;
  background-color: ${(props) => props.theme.palette.background};
  border-radius: 3px;
  animation: ${blowUpModal} 0.3s;

  &.modal-animation-exit {
    transform: scale(1);
  }

  &.modal-animation-exit-active {
    transform: scale(0);
    transition: transform 300ms;
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: 12px;
  overflow: auto;

  ${(props) =>
    props.minWidth &&
    css`
      min-width: ${props.minWidth};
    `}
`;

export const ModalFooter = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid ${(props) => props.theme.rgbaColor(0.04)};
  ${(props) =>
    props.reverse &&
    css`
      flex-direction: row-reverse;
    `}

  ${(props) =>
    props.center &&
    css`
      justify-content: center;
    `}

  button {
    margin-left: 12px;
  }
`;

export const Button = styled.button`
  background: ${(props) => props.theme.palette.info};
  padding: 8px 24px;
  color: ${(props) => props.theme.palette.white};
  border: 0;
  border-radius: 3px;
  cursor: pointer;
`;
