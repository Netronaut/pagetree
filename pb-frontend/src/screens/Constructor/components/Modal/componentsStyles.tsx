import styled from 'styled-components';

export const ModalContainer = styled.div<{ visible: boolean }>`
  display: flex;
  border: 1px solid;
  position: absolute;
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
