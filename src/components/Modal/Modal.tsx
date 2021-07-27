import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { CrossIcon } from '../icons';
import { ModalButton } from './ModalButton';
import S, { ModalContainerProps } from './Modal.styles';

type ModalProps = ModalContainerProps & {
  children?: ReactNode;
  onClose: () => void;
  position?: 'bottom-left';
};

export const Modal = ({ children, onClose, position }: ModalProps): ReactElement => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
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
    <S.ModalContainer ref={modalRef} draggable="true" onDragStart={onDragStart} position={position}>
      <S.ModalHeader>
        <ModalButton onClick={onClose}>
          <CrossIcon />
        </ModalButton>
      </S.ModalHeader>
      {children}
    </S.ModalContainer>
  );
};
