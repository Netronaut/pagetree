import styled from 'styled-components';

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
