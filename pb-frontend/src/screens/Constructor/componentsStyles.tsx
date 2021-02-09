import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ConstructorScreen = styled.div({
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
});

export const NavLink = styled(Link)({
  textDecoration: 'none',
  textTransform: 'uppercase',
});

export const Header = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`;

export const DroppableContent = styled.div({
  overflow: 'scroll',
  width: '100%',
  height: 'calc(100% - 120px)',
  padding: '15px',
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
