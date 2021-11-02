import { ThemeProvider } from 'styled-components';
import * as theme from '@pagetree/components/src/theme.ts';
import { GlobalStyle } from '@pagetree/components/src/globalStyle';
import './style.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
