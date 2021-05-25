import styled from 'styled-components';

export const ModalContainer = styled.div<{
  isAddComponents?: boolean;
}>`
  z-index: 2;
  top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: #39a7ff;
  outline: none;
  color: #fff;

  ${({ isAddComponents }) => {
    if (isAddComponents)
      return `
        position: fixed;
        left: 15px;
        border-radius: 10px;
        width: 300px;
        max-height: 95vh;
        padding: 40px 9px 24px 24px;
      `;
    return `
      position: absolute;
      right: 15px;
      border-radius: 5px;
      width: 331px;
      padding: 37px 16px 24px;
    `;
  }}

  input {
    background: transparent;
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }
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
    if (mainStream) {
      return `
        width: 100%;
        border-radius: 10px;
        padding: 10px 15px;
      `;
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
  margin-right: 15px;
  font-size: 32px;
  line-height: 37.5px;
  text-align: center;
`;
export const ModalH3 = styled.h3`
  font-size: 22px;
  line-height: 21px;
  text-align: center;
`;

export const SearchBox = styled.div`
  position: relative;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 7px 44px 7px 14px;
  margin-bottom: 25px;
  margin-right: 15px;
  * {
    color: #fff;
    background: transparent;
    border: none;
  }
  input {
    width: 100%;
    padding: 0;
    font-size: 16px;
    line-height: 18.75px;
  }
  input:focus {
    outline: none;
  }
  button {
    position: absolute;
    right: 14px;
    top: calc(50% - 8.5px);
    padding: 0;
  }
`;

export const ModalInput = styled.input`
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px 15px;
  &:focus {
    outline: none;
  }
`;

export const Sel = styled.div`
  border: 1px solid #f9f9f9;
  border-radius: 10px;
  padding: 20px 13px;
  &:hover {
    background: #f9f9f9;
    color: #3d3d3d;
  }
`;

export const Hr = styled.hr`
  margin-top: 32px;
  width: 95%;
  height: 1px;
  border: none;
  background: #f9f9f9;
`;
