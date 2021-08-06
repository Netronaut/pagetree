import { useState } from 'react';

export const useModal = (): {
  onModalShow: () => void;
  onModalClose: () => void;
  isModalShown: boolean;
} => {
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
