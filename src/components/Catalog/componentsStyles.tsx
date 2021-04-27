import styled from 'styled-components';

export const DroppableComponentContainer = styled.div({
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
}, `
  &:first-child {
    border-radius: 20px 20px 0 0;
    height: 50px;
  }
  &:last-child {
    margin-bottom: 0;
    border-radius: 0 0 10px 10px;
    height: 150px;
  }
`);

export const StyledGroupWrapper = styled.div<{ isOpen: boolean }>`
  border: 1px solid #F9F9F9;
  border-radius: 20px;
  overflow: hidden;
  header {
    position: relative;
    background: #f9f9f9;
    padding: 17px 44px 16px 16px;
    color: #6a6a6a;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
  }
  section {
    padding: 16px;
    overflow: hidden;
    transition: all 0.2s;
    height: 100%;
    ${({ isOpen }) => isOpen && `
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
  cursor: pointer;
  &:hover, &:focus-visible {
    transform: scale(1.2);
  }
  &:focus {
    outline: none;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(180deg);
    transition: transform 0.2s;
    ${({ isOpen }) => isOpen && `
      transform: rotate(0deg);
      transition: transform 0.2s;
    `}
  }
`;
