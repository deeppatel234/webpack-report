import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import ModalComponent from './ModalComponent';

import { ModalBody, ModalFooter, Button } from './styled';

const modalRoot = document.body;

const Modal = ({ visible, component: Component, destroyOnClose, ...rest }) => {
  const [unMounted, setUnMounted] = useState(true);

  useEffect(() => {
    if (visible) {
      setUnMounted(false);
    }
  }, [visible]);

  if (destroyOnClose && unMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <Component setUnMounted={setUnMounted} visible={visible} {...rest} />,
    modalRoot,
  );
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.FooterButton = Button;

Modal.defaultProps = {
  component: ModalComponent,
  destroyOnClose: true,
};

export default Modal;
