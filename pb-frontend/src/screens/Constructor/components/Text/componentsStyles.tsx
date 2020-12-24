import styled from 'styled-components';

export const ComponentContainer = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
`;

export const Input = styled.input`
  text-transform: capitalize;
  border: 1px solid;
  padding: 5px;
  box-sizing: border-box;
  outline: none;
  color: #282c34;
  font-family: 'Source Code Pro', serif;
  font-weight: lighter;
  cursor: pointer;
  position: relative;
  z-index: -1;
`;
