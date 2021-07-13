import styled from 'styled-components';

const HistoryWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  /* top: -100vh; */
  top: ${({ isOpen }) => (isOpen ? '0' : '-100vh')};
  width: 100%;
  max-height: 100vh;
  z-index: 10;
  background: #d5d7d8eb;
  color: #3d3d3d;
  section {
    overflow-y: auto;
  }
`;

export const ShowHistoryButton = styled.button<{ isOpen: boolean }>`
  background: #69bbfd;
  border-radius: 50%;
  position: absolute;
  bottom: -16px;
  right: calc(50% - 3.5px);
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

const HistoryItem = styled.div`
  position: relative;
  border: 1px solid transparent;
  box-sizing: border-box;
  padding: 4px 35px 4px 15px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  background: #69bbfd;
  :hover {
    border: 1px solid hsla(201, 100%, 47%, 0.2);
  }
  span {
    display: block;
  }
`;

const HistoryGroup = styled.div<{ isOpen: boolean }>`
  margin: 4px 16px;
  border: ${({ isOpen }) => (isOpen ? '1px solid #F9F9F9' : 'none')};
  border-radius: 8px;
  overflow: hidden;
  header {
    position: relative;
    background: #f9f9f9;
    padding: 17px 44px 16px 16px;
    color: #6a6a6a;
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
  button {
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
  }
`;

export const HistoryGroupItem = styled.ul`
  padding: 0;
  margin-bottom: 3px;
  li {
    margin-bottom: 3px;
    display: grid;
    grid-template: 1fr /1fr 1fr 6fr 3fr 1fr;
    grid-gap: 6px;
  }
  strong {
    grid-column: 2 / 3;
  }
`;

export default {
  HistoryWrapper,
  HistoryGroup,
  HistoryItem,
  HistoryGroupItem,
  ShowHistoryButton,
};
