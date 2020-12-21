import styled from 'styled-components';

export const ComponentContainer = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
`;

export const Input = styled.input({
  textTransform: 'capitalize',
  border: '1px solid transparent',
  padding: '5px',
  boxSizing: 'border-box',
  outline: 'none',
  color: '#282c34',
  fontFamily: 'Source Code Pro',
  fontWeight: 'lighter',
  cursor: 'pointer',
});
