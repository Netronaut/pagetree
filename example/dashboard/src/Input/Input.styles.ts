import styled from 'styled-components';

export const InputRoot = styled.div<{ icon?: boolean }>`
  ${({ icon }) =>
    icon
      ? `
position: relative;

svg {
  position: absolute;
  top: calc(50% - 22px / 2);
  left: 9px;
}
      `
      : ''}
`;
