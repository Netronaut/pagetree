import styled from 'styled-components';

export const Sidebar = styled.aside<{ open: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  display: ${({ open }) => (open ? 'block' : 'none')};
  height: 100%;
  width: ${({ theme }) => theme.spacing.sidebarWidth};
  background: ${({ theme }) => theme.color.white};
  padding: 76px 22px 1em;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.secondary};
    border-radius: 3px;
  }
`;
