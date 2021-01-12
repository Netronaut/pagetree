import styled from 'styled-components';

export const ComponentContainer = styled.div({
  width: '100%',
  height: '100px',
  borderRadius: '20px',
  border: '1px solid',
  boxSizing: 'border-box',
  padding: '10px',
});

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
