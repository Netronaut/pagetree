import React, { useEffect, useRef } from 'react';
import { ModalContainer, ModalHeader, ModalButton } from './componentsStyles';

type Props = {
  onClose: () => void;
  isAddComponents?: boolean;
};

export const Modal: React.FC<Props> = ({ children, onClose, isAddComponents }) => {
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
    <ModalContainer
      ref={modalRef}
      draggable="true"
      onDragStart={onDragStart}
      isAddComponents={isAddComponents}
    >
      <ModalHeader>
        {isAddComponents &&
          <ModalButton onClick={() => alert('info')}>
            <img src="infoAboutComponents.20c6aad0.svg" alt="info Icon" />
          </ModalButton>
        }
        <ModalButton onClick={onClose}>
          <img src="cross.d7c6ba61.svg" alt="test" />
        </ModalButton>
      </ModalHeader>
      {children}
    </ModalContainer>
  );
};
