import React, { useEffect, useRef } from 'react';
import { ModalContainer, ModalHeader, ModalButton } from './componentsStyles';

type Props = {
  onClose: () => void;
  isAddComponents?: boolean;
};

export const Modal: React.FC<Props> = ({
  children,
  onClose,
  isAddComponents,
}) => {
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
        {isAddComponents && (
          <ModalButton onClick={() => alert('info')}>
            <Info />
          </ModalButton>
        )}
        <ModalButton onClick={onClose}>
          <Cross />
        </ModalButton>
      </ModalHeader>
      {children}
    </ModalContainer>
  );
};

const Info: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7 12.8125C3.79063 12.8125 1.1875 10.2094 1.1875 7C1.1875 3.79063 3.79063 1.1875 7 1.1875C10.2094 1.1875 12.8125 3.79063 12.8125 7C12.8125 10.2094 10.2094 12.8125 7 12.8125Z"
      fill="white"
    />
    <path
      d="M6.22229 4.63892C6.22229 4.83783 6.30423 5.02859 6.4501 5.16925C6.59596 5.3099 6.79379 5.38892 7.00007 5.38892C7.20635 5.38892 7.40418 5.3099 7.55004 5.16925C7.6959 5.02859 7.77785 4.83783 7.77785 4.63892C7.77785 4.44 7.6959 4.24924 7.55004 4.10859C7.40418 3.96793 7.20635 3.88892 7.00007 3.88892C6.79379 3.88892 6.59596 3.96793 6.4501 4.10859C6.30423 4.24924 6.22229 4.44 6.22229 4.63892ZM7.38896 6.38892H6.61118C6.53988 6.38892 6.48155 6.44517 6.48155 6.51392V10.7639C6.48155 10.8327 6.53988 10.8889 6.61118 10.8889H7.38896C7.46025 10.8889 7.51859 10.8327 7.51859 10.7639V6.51392C7.51859 6.44517 7.46025 6.38892 7.38896 6.38892Z"
      fill="white"
    />
  </svg>
);

const Cross: React.FC = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.30327 16.9099L11.6066 11.6066M11.6066 11.6066L16.9099 6.3033M11.6066 11.6066L16.9099 16.9099M11.6066 11.6066L6.30327 6.3033"
      stroke="white"
      strokeLinecap="round"
    />
  </svg>
);
