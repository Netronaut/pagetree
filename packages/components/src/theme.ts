export const color: Record<string, string> = {
  secondary: '#5f9efc',
  red: '#db3838',
  primary: '#24c217',
  white: '#ffffff',
  gray1: '#333333',
  gray2: '#676767',
  gray3: '#d0d0d0',
  gray4: '#f5f5f5',
};

color.canvasBgColor = color.gray4;

const xxs = '0.375rem';
const xs = '0.75rem';
const sm = '1.125rem';
const md = '1.375rem';
const lg = '1.75rem';
const xl = '2.25rem';
const xxl = '3.5rem';

export const spacing: Record<string, string> = {
  xxs,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  button: `${xs} ${xl}`,
  input: `${xs}`,

  sidebarWidth: '300px',
};

export const zIndex = {
  interface: 10,
};
