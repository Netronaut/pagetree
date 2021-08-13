import styled from 'styled-components';
import { ButtonProps } from './Button';

export const StyledButton = styled.button<{ color: ButtonProps['color'] }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 162px;
  background: ${({ color }) => {
    if (color === 'primary') return '#24c217';
    if (color === 'secondary') return '#5F9EFC';
    if (color === 'transparent') return 'transparent';
  }};
  border: none;
  border-radius: 3px;
  padding: 10px 16px 11px;
  cursor: pointer;
  transition: all 200ms;

  text-transform: uppercase;
  color: ${({ color }) => (color === 'transparent' ? '#CCCCCC' : '#FFFFFF')};
  //styleName: Medium Bold CTA;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;

  :focus,
  :hover {
    transform: scale(1.02);
    outline: none;
  }
`;
