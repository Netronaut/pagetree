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
  padding: 43px 35px 38px;

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
