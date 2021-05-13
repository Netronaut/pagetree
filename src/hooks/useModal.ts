import { useState } from 'react';

export const useModal = () => {
  const [visible, setVisible] = useState(false);

  const onModalShow = () => {
    setVisible(true);
  };

  const onModalClose = () => {
    setVisible(false);
  };

  return {
    onModalShow,
    onModalClose,
    isModalShown: visible,
  };
};
