import React, { useEffect, useRef } from 'react';
import { ModalContainer, ModalHeader, ModalButton } from './componentsStyles';

type Props = {
  onClose: () => void;
  position?: 'left';
};

export const Modal: React.FC<Props> = ({ children, onClose, position }) => {
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
    <ModalContainer ref={modalRef} draggable="true" onDragStart={onDragStart} position={position}>
      <ModalHeader>
        <ModalButton onClick={onClose}>
          <Cross />
        </ModalButton>
      </ModalHeader>
      {children}
    </ModalContainer>
  );
};

const Cross: React.FC = () => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.30327 16.9099L11.6066 11.6066M11.6066 11.6066L16.9099 6.3033M11.6066 11.6066L16.9099 16.9099M11.6066 11.6066L6.30327 6.3033"
      stroke="white"
      strokeLinecap="round"
    />
  </svg>
);
