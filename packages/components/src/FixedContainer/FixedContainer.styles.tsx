import styled from 'styled-components';

export const FixedContainer = styled.div<{ isChangelogOpen: boolean }>`
  position: fixed;
  width: ${({ isChangelogOpen, theme }) =>
    isChangelogOpen ? `calc( 100% - ${theme.spacing.sidebarWidth})` : '100%'};
`;
