import React, { createRef } from 'react';
import { ModalContainer } from './componentsStyles';

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

  onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      visible && (
        <ModalContainer
          visible={visible}
          ref={this.modalRef}
          draggable="true"
          onDragStart={this.onDragStart}
        >
          {children}
        </ModalContainer>
      )
    );
  }
}
