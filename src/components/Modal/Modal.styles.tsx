import styled from 'styled-components';

interface ModalContainerProps {
  position?: string;
}

const ModalContainer = styled.div<ModalContainerProps>`
  z-index: 2;
  top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: #39a7ff;
  outline: none;
  color: #fff;

  ${({ position }) => {
    if (position === 'left')
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

const ModalHeader = styled.header({
  position: 'absolute',
  top: '15px',
  right: '15px',
  display: 'flex',
});

const ModalH3 = styled.h3`
  font-size: 22px;
  line-height: 21px;
  text-align: center;
`;

const ModalInput = styled.input`
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px 15px;
  &:focus {
    outline: none;
  }
`;

const Sel = styled.div`
  border: 1px solid #f9f9f9;
  border-radius: 10px;
  padding: 20px 13px;
  &:hover {
    background: #f9f9f9;
    color: #3d3d3d;
  }
`;

const Hr = styled.hr`
  margin-top: 32px;
  width: 95%;
  height: 1px;
  border: none;
  background: #f9f9f9;
`;

export default {
  ModalContainer,
  ModalHeader,
  ModalH3,
  ModalInput,
  Sel,
  Hr,
};
