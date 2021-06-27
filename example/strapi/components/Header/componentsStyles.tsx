import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeadWrapper = styled.header`
  display: grid;
  grid-template: 1fr / 1fr minmax(auto, 238px) 4fr 2fr 1fr;
  background: #282c39;
  color: white;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 18.75px;
  padding: 20px 15px;
`;
export const HeadContent = styled.div`
  grid-column: 4 / 4;
  display: grid;
  grid-auto-flow: column;
  justify-items: end;
  align-items: center;
  grid-template-columns: auto 60px;
`;

export const Logo = styled(Link)`
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  svg {
    width: 42px;
    height: 42px;
  }
  span {
    margin-left: 11px;
    font-size: 45px;
    font-weight: 700;
  }
`;

export const Label = styled.label`
  cursor: pointer;
`;

export const ToggleButton = styled.input`
  position: relative;
  display: inline-block;
  margin: 0;
  vertical-align: top;
  background: #b9e0ff;
  box-shadow: inset 0px 1.24px 2.8px rgba(0, 0, 0, 0.25);
  outline: none;
  cursor: pointer;
  height: 20.25px;
  width: 48.94px;
  border-radius: 62px;
  appearance: none;
  transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: -2.5px;
    width: 27px;
    height: 27px;
    background: #39a7ff;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
    transform: translateX(0);
  }
  &:checked:after {
    transform: translateX(82%);
  }
`;