import styled from 'styled-components';

export interface ModalContainerProps {
  position?: 'bottom-left';
  hide?: boolean;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  z-index: 2;
  top: 15px;
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: #39a7ff;
  outline: none;
  color: #fff;
  padding: 24px;

  ${({ position }) => {
    if (position === 'bottom-left')
      return `
        position: absolute;
        left: 15px;
        bottom: 15px;
        top: auto;
        border-radius: 10px;
        width: 300px;
        max-height: 95vh;
      `;
    return `
      position: absolute;
      right: 15px;
      border-radius: 5px;
      width: 331px;
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

export const ModalHeader = styled.header({
  position: 'absolute',
  top: '15px',
  right: '15px',
  display: 'flex',
});

export const ModalH3 = styled.h3`
  font-size: 22px;
  line-height: 21px;
  text-align: center;
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