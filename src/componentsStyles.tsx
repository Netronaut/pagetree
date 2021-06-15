import styled from 'styled-components';

export const ConstructorScreen = styled.div({
  height: 'calc(100% - 86px)',
  width: '100%',
  boxSizing: 'border-box',
});

export const DroppableContent = styled.div({
  width: '100%',
  height: '100%',
  padding: '15px',
  boxSizing: 'border-box',
});

export const Flex = styled.section<{
  px?: number;
  mt?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}>`
  ${({ mt }) => (mt ? `margin-top: ${mt}px` : '')};
  display: flex;
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  padding-left: ${({ px }) => (px && `${px}px`) ?? '15px'};
  padding-right: ${({ px }) => (px && `${px}px`) ?? '15px'};
`;

export const H1 = styled.h1`
  margin: 0;
  font-size: 63px;
  color: #3d3d3d;
`;

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 15px;
  background: #39a7ff;
  cursor: pointer;
  color: #fff;
`;

export const SavePageContentBatton = styled(Button)<{ hidden?: boolean }>`
  position: fixed;
  bottom: ${({ hidden }) => (hidden ? '-50px' : '5px')};
  right: calc(50% - 90px);
  width: 180px;
  font-size: 19px;
  text-transform: capitalize;
  transition: all 0.4s ease-out; // need to fix;
`;
