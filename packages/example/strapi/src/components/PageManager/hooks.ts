import { RefObject, useEffect } from 'react';

export const useTapOutside = (
  ref: RefObject<HTMLInputElement | HTMLDivElement>,
  close: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (ref && !ref.current?.contains(target)) close();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);
};
