import styled, { css } from 'styled-components';

export interface DefaultTypographyProps {
  flex?: boolean;
  color?: string;
}

export const baseFontStyle = css`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
`;

export const Default = styled.span<DefaultTypographyProps>`
  ${baseFontStyle}
  ${({ flex }) => (flex ? 'display: flex;' : '')}
  color: ${({ color }) => (color ? color : 'inherit')};
`;

export const Larger = styled(Default)`
  font-size: 18px;
`;

export const LargerMedium = styled(Default)`
  font-size: 24px;
  font-weight: 500;
`;

export const MediumBold = styled(Default)`
  font-size: 16px;
  font-weight: 700;
`;

export const Smaller = styled(Default)`
  font-size: 12px;
  font-weight: 400;
`;

export const SmallerBold = styled(Default)`
  font-size: 12px;
  font-weight: 700;
`;
