import styled from 'styled-components';

export const ConstructorScreen = styled.div({
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
});

export const DroppableContent = styled.div({
  overflow: 'scroll',
  width: '100%',
  height: 'calc(100% - 100px)',
  padding: '25px',
  boxSizing: 'border-box',
});

export const Footer = styled.div({
  width: '100%',
  height: '100px',
  background: '#f1f0f0',
  boxSizing: 'border-box',
  display: 'flex',
  padding: '25px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});
