import styled from 'styled-components';

export const DroppableComponentContainer = styled.div(
  {
    borderRadius: '20px',
    background: '#69BBFD',
    boxSizing: 'border-box',
    padding: '0 25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 15px',
    height: '80px',
    color: '#F9F9F9',
    fontFamily: 'Gotham Pro',
    fontSize: '16px',
    lineHeight: '15px',
    textAlign: 'center',
  },
  `
  &:first-child {
    border-radius: 20px 20px 0 0;
    height: 50px;
  }
  &:last-child {
    margin-bottom: 0;
    border-radius: 0 0 10px 10px;
    height: 150px;
  }
`,
);

export const StyledCatalogWrapper = styled.div`
  overflow-y: scroll;
  padding-right: 11px;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #69bbfd;
    border-radius: 3px;
  }
`;

export const StyledGroupWrapper = styled.div<{ isOpen: boolean }>`
  margin-bottom: 16px;
  border: ${({ isOpen }) => (isOpen ? '1px solid #F9F9F9' : 'none')};
  border-radius: 20px;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  header {
    position: relative;
    background: #f9f9f9;
    padding: 17px 44px 16px 16px;
    color: #6a6a6a;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    ${({ isOpen }) =>
      !isOpen &&
      `
      background: #69BBFD;
      color: #F9F9F9;
    `}
  }
  section {
    padding: 16px;
    overflow: hidden;
    transition: all 0.2s;
    height: 100%;
    ${({ isOpen }) =>
      !isOpen &&
      `
      height: 0;
      padding: 0;
    `}
  }
`;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: calc(50% - 3.5px);
  right: 16px;
  border: none;
  width: 12px;
  height: 7px;
  padding: 0;
  background: transparent;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(180deg);
    transition: transform 0.2s;
    ${({ isOpen }) =>
      isOpen &&
      `
      transform: rotate(0deg);
      transition: transform 0.2s;
    `}
  }
`;
