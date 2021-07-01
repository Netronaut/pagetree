export const createUrlFromText = (text: string): string => {
  return (
    '/' +
    text
      .split('')
      .map((littera) => {
        if (littera === ' ') return '-';
        return littera;
      })
      .join('')
      .toLowerCase()
  );
};
