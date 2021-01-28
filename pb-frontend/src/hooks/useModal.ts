import { Modal } from 'src/screens/Constructor/components/Modal';
import { useRef } from 'react';

export const useModal = () => {
  const modalRef = useRef<Modal>(null);

  const show = () => {
    modalRef.current?.showModal();
  };

  return {
    modalRef,
    show,
  };
};
