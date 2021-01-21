import React, { createRef } from 'react';
import { ModalContainer, Close } from './componentsStyles';

type Props = {
  id: string;
};

type State = {
  visible: boolean;
};

export class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

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
    return (
      <ModalContainer visible={visible} ref={modalRef}>
        <Close onClick={() => this.onModalClose()}>X</Close>
        {this.props.id && <div>{this.props.id}</div>}
      </ModalContainer>
    );
  }
}
