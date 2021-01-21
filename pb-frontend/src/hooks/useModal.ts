import { Modal } from '../screens/Constructor/components/Modal';

export const useModal = () => {
  let ref: Modal;

  const modalRef = (initialRef: Modal) => {
    ref = initialRef;
  };

  const show = () => {
    if (ref) ref.onModalShow();
  };

  return {
    modalRef,
    show,
  };
};
