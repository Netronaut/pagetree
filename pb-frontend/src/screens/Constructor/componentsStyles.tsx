import styled from 'styled-components';

export const ConstructorScreen = styled.div({
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
});

export const DroppableContent = styled.div({
  overflow: 'scroll',
  width: '100%',
  height: '90%',
  padding: '25px',
  boxSizing: 'border-box',
});

export const Footer = styled.div({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '150px',
  background: '#f1f0f0',
  boxSizing: 'border-box',
  display: 'flex',
  padding: '25px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const DroppableComponentContainer = styled.div({
  width: '500px',
  height: '100px',
  margin: '0 10px',
  borderRadius: '10px',
  background: 'white',
  color: '#282c34',
  fontWeight: 'bolder',
  fontFamily: 'Source Code Pro',
  boxSizing: 'border-box',
  padding: '25px',
  border: '1px dashed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
