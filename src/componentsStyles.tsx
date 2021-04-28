import styled from 'styled-components';

export const ConstructorScreen = styled.div({
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
});

export const DroppableContent = styled.div({
  // overflow: 'scroll',
  width: '100%',
  // height: 'calc(100% - 100px)',
  height: '100%',
  padding: '15px',
  boxSizing: 'border-box',
});

export const Flex = styled.section<{
  px?: number;
  mt?: number;
}>`
  ${({ mt }) => (mt ? `margin-top: ${mt}px` : '')};
  display: flex;
  padding-left: ${({ px }) => (px ? `${px}px` : '15px')};
  padding-right: ${({ px }) => (px ? `${px}px` : '15px')};
`;
