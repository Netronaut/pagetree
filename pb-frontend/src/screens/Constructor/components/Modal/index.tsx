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

  modalRef = createRef<HTMLDivElement>();

  handleClickOutside = (event: Event) => {
    if (
      this.modalRef.current &&
      !this.modalRef.current.contains(event.target as Node)
    ) {
      this.closeModal();
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
    window.addEventListener('click', this.handleClickOutside, true);
    window.addEventListener('mousedown', this.handleClickOutside, true);
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
    window.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('mousedown', this.handleClickOutside);
  };

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <ModalContainer visible={visible} ref={this.modalRef}>
        <Close onClick={this.closeModal}>X</Close>
        {children}
      </ModalContainer>
    );
  }
}
