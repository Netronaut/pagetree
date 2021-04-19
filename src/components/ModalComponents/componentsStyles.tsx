import styled from 'styled-components';

export const Modal = styled.div({
  position: 'fixed',
  top: '15px',
  left: '15px',
  borderRadius: '10px',
  background: '#39A7FF',
  boxSizing: 'border-box',
  display: 'flex',
  padding: '14px',
  flexDirection: 'column',
});

export const ModalButton = styled.button({
  border: 'none',
  background: 'none',
  color: 'white',
  cursor: 'pointer',
});

export const ModalHeader = styled.header({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '-10px',
  marginRight: '-10px',
});
