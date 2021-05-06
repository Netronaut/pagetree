import React, { useEffect, useRef, useState } from 'react';
import { ModalContainer, ModalHeader, ModalButton } from './componentsStyles';

type Props = {
  onOpenClose: (val: boolean) => void;
  isAddComponents?: boolean;
};

export const Modal: React.FC<Props> = ({ children, onOpenClose, isAddComponents }) => {
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
        onOpenClose(false);
      }
    };
    window.addEventListener('click', handleClickOutside, true);
    window.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [prohibitGoingBeyondTheScreen, setProhibitGoingBeyondTheScreen] = useState(false);
  useEffect(() => {
    if (modalRef.current?.offsetParent?.nextElementSibling && modalRef.current && modalRef.current.offsetLeft < 0) {
      setProhibitGoingBeyondTheScreen(true);
    }
  }, [modalRef?.current?.offsetLeft]);

  return (
    <ModalContainer
      ref={modalRef}
      draggable="true"
      onDragStart={onDragStart}
      isAddComponents={isAddComponents}
      prohibitGoingBeyondTheScreen={prohibitGoingBeyondTheScreen}
    >
      <ModalHeader>
        {isAddComponents &&
          <ModalButton onClick={() => alert('info')}>
            <img src="infoAboutComponents.20c6aad0.svg" alt="info Icon" />
          </ModalButton>
        }
        <ModalButton onClick={() => onOpenClose(false)}>
          <img src="cross.d7c6ba61.svg" alt="test" />
        </ModalButton>
      </ModalHeader>
      {children}
    </ModalContainer>
  );
};
