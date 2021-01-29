import { useState } from 'react';

export const useModal = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const onModalClose = () => {
    setVisible(false);
  };

  return {
    show,
    modalShown: visible,
    onModalClose,
  };
};
