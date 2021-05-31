import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.section`
  position: fixed;
  bottom: 3px;
  right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #edd;
  padding: 15px;
`;

export const StyledLink = styled(Link)`
  color: black;
  margin-right: 15px;
  text-decoration: none;
`;

