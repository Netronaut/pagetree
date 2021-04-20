import React, { useEffect, useRef } from 'react';
import { Modal, ModalHeader, ModalButton } from './componentsStyles';

import infoIcon from '../../../images/infoAboutComponents.svg';
import cross from '../../../images/cross.svg';

type Props = {
  onClose: (val: boolean) => void;
};

export const ModalComponents: React.FC<Props> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(false);
      }
    };
    window.addEventListener('click', handleClickOutside, true);
    window.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Modal ref={modalRef} draggable="true" onDragStart={onDragStart}>
      <ModalHeader>
        <ModalButton onClick={() => alert('info')}><img src={infoIcon} alt="info Icon" /></ModalButton>
        <ModalButton onClick={() => onClose(false)}><img src={cross} alt="test" /></ModalButton>
      </ModalHeader>
      {children}
    </Modal>
  );
};
