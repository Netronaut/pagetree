import styled from 'styled-components';
import { IconButton } from '../icons';

export const ModalBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 100%);
  transition: opacity 0.2s ease, background 0.2s ease;
  opacity: 0.5;
  filter: blur(8px);
`;

export const ModalContainer = styled.div`
  --modal-padding: ${({ theme }) => theme.spacing.large};
  position: fixed;
  top: 30%;
  left: calc(50% - 24vw);
  width: 48vw;
  display: flex;
  flex-direction: column;
  border: 2px solid #fff;
  border-radius: 4px;
  box-shadow: 0px 11px 18px 2px #00000040;
  background: #fff;
  padding: var(--modal-padding);

  button:last-child {
    margin-top: 46px;
    width: calc(60% - 20ch);
    max-height: 44px;
    align-self: center;
  }
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const ModalInput = styled.input<{ isError: boolean }>`
  border-radius: 4px;
  border: 2px solid transparent;
  border-color: ${({ theme, isError }) => (isError ? theme.color.red : '')};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  padding: 9px 7px 8px;
  background-color: ${({ theme }) => theme.color.gray4};
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  ::placeholder {
    color: ${({ theme }) => `${theme.color.gray1}4d`};
  }
  &:focus:not(:placeholder-shown) {
    border-color: hsla(201, 100%, 47%, 1) !important;
  }
  &:focus + button:not(:disabled) {
    background: hsla(201, 100%, 47%, 1);
  }
`;

export const ModalLabel = styled.label`
  flex: 1 0 calc(100% - 20ch);
  span {
    display: block;
    &:first-child {
      margin: 23px 7px 6px;
    }
    &:last-child {
      margin: 6px 7px 4px;
    }
  }
`;
