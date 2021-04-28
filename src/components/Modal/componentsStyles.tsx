import styled from 'styled-components';

export const ModalContainer = styled.div<{
  isAddComponents?: boolean;
}>`
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: #39A7FF;
  padding: 37px 16px 24px;
  outline: none;
  color: #fff;

  ${({ isAddComponents }) => {
    if (isAddComponents)
      return `
        position: fixed;
        z-index: 2;
        border-radius: 10px;
        width: 300px;
        padding: 40px 24px 24px;
      `
    return `
      z-index: 1;
      border-radius: 5px;
      width: 331px;
    `
  }}
`;

export const ModalButton = styled.button<{
  whiteBg?: boolean;
  mainStream?: boolean;
}>`
  border: none;
  cursor: pointer;
  background: ${({ whiteBg }) => (whiteBg ? '#f9f9f9' : 'none')};
  color: ${({ whiteBg }) => (whiteBg ? '#3D3D3D' : '#fff')};
  ${({ mainStream }) => {
    if(mainStream) {
      return `
        width: 100%;
        border-radius: 10px;
        padding: 10px 15px;
      `
    }
  }}
`;

export const ModalHeader = styled.header({
  position: 'absolute',
  top: '15px',
  right: '15px',
  display: 'flex',
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