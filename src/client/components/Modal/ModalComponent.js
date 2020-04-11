import React, { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ModalWrapper, BodyWrapper } from './styled';

const ModalComponent = ({
  visible,
  children,
  onClose,
  maskClosable,
  setUnMounted,
  position,
  ...restProps
}) => {
  const onCloseModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, []);

  const onClickBody = useCallback(() => {
    if (maskClosable) {
      onCloseModal();
    }
  }, []);

  const onClickModalWrapper = useCallback(event => {
    event.stopPropagation();
  }, []);

  return (
    <CSSTransition in={visible} timeout={300} classNames="modal-body-animation">
      <BodyWrapper onClick={onClickBody} position={position}>
        <CSSTransition
          in={visible}
          timeout={300}
          classNames="modal-animation"
          onExited={() => setUnMounted(true)}
        >
          <ModalWrapper onClick={onClickModalWrapper} {...restProps}>
            {children}
          </ModalWrapper>
        </CSSTransition>
      </BodyWrapper>
    </CSSTransition>
  );
};

ModalComponent.defaultProps = {
  visible: false,
  onClose: false,
  maskClosable: true,
  position: 'center',
};

export default ModalComponent;
