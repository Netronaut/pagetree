import React, { createRef } from 'react';
import { ModalContainer, Close } from './componentsStyles';

type State = {
  visible: boolean;
  id: string;
};

export class Modal extends React.Component<unknown, State> {
  state = {
    visible: false,
    id: '',
  };

  onModalShow = () => {
    this.setState({
      visible: true,
    });
  };

  onModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { children } = this.props;
    const { visible } = this.state;
    const modalRef = createRef<HTMLDivElement>();

    const handleClickOutside = (event: Event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        this.onModalClose();
      }
    };

    window.addEventListener('click', handleClickOutside, true);
    window.addEventListener('mousedown', handleClickOutside, true);

    return (
      <ModalContainer visible={visible} ref={modalRef}>
        <Close onClick={() => this.onModalClose()}>X</Close>
        {children}
      </ModalContainer>
    );
  }
}
