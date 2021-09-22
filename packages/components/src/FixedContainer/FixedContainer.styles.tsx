import styled from 'styled-components';

export const FixedContainer = styled.div<{ sidebarOpen: boolean }>`
  position: fixed;
  width: ${({ sidebarOpen, theme }) =>
    sidebarOpen ? `calc( 100% - ${theme.spacing.sidebarWidth})` : '100%'};
`;
