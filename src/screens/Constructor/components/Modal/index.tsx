import React, { useEffect, useRef } from 'react';
import { ModalContainer } from './componentsStyles';

type Props = {
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ children, onClose }) => {
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
    <ModalContainer ref={modalRef} draggable="true" onDragStart={onDragStart}>
      {children}
    </ModalContainer>
  );
};
