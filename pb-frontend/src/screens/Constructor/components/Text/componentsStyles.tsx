import styled from 'styled-components';

export const Input = styled.input<{ pointerEventsDisabled: boolean }>`
  text-transform: capitalize;
  padding: 5px;
  box-sizing: border-box;
  outline: none;
  color: #282c34;
  font-family: 'Source Code Pro', serif;
  font-weight: lighter;
  position: relative;
  pointer-events: ${({ pointerEventsDisabled }) =>
    pointerEventsDisabled ? 'none' : 'auto'};
`;

export const TextContainer = styled.div`
  box-sizing: border-box;
  outline: none;
  position: relative;
`;

export const Configure = styled.div`
  box-sizing: border-box;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid;
  padding: 5px;
  cursor: pointer;
`;
