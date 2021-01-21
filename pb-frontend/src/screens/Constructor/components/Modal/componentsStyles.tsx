import styled from 'styled-components';

export const ModalContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  border: 1px solid;
  position: absolute;
  height: 300px;
  width: 300px;
  box-sizing: border-box;
  outline: none;
  background: #ffffff;
  font-family: 'Source Code Pro', serif;
  font-weight: lighter;
  z-index: 2;
  right: 0;
  top: 35px;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  padding: 20px;
`;

export const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
`;
