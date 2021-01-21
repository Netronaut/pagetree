import { Modal } from '../screens/Constructor/components/Modal';
import { useRef } from 'react';

export const useModal = () => {
  const modalRef = useRef<Modal>(null);

  const show = () => {
    modalRef.current?.onModalShow();
  };

  return {
    modalRef,
    show,
  };
};
