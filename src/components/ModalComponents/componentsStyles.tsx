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
  color: '#fff',
});

export const ModalButton = styled.button({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

export const ModalHeader = styled.header({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '-10px',
  marginRight: '-10px',
});

export const ModalH2 = styled.h2`
  font-size: 32px;
  line-height: 37.5px;
  text-align: center;
`;

export const SearchBox = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 6px 14px;
  margin-bottom: 25px;
  * {
    color: #fff;
    background: transparent;
    border: none;
  }
  input {
    font-size: 16px;
    line-height: 18.75px;
  }
`
