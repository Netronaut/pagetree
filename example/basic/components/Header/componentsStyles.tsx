import styled from 'styled-components';

export const HeadWrapper = styled.header`
  display: grid;
  grid-template: 1fr / 1fr minmax(auto, 238px) minmax(auto, 1600px) 1fr;
  background: #282C39;
  color: white;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 18.75px;
  padding: 20px 15px;
`;
export const HeadContent = styled.div`
  grid-column: 3 / 4;
  display: grid;
  grid-auto-flow: column;
  justify-items: end;
  align-items: center;
  grid-template-columns: auto 60px;
`;

export const Logo = styled.div`
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  img {
    width: 42px;
  }
  span {
    margin-bottom: -33px;
    margin-left: 11px;
    height: 100%;
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
  background: #B9E0FF;
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
    background: #39A7FF;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
    transform: translateX(0);
  }
  &:checked:after {
    transform: translateX(82%);
  }
`;
