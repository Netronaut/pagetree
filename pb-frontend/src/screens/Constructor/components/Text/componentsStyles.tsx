import styled from 'styled-components';

export const Input = styled.input<{ pointerEventsDisabled: boolean }>`
  text-transform: capitalize;
  border: 1px solid;
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
