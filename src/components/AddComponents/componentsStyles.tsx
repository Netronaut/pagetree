import styled from 'styled-components';

export const AddComponentsWrapper = styled.div`
  position: fixed;
  width: 85px;
  left: 16px;
  bottom: 16px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  box-shadow: 0 0 20px 0px #cecece;
  button {
    width: 100%;
    height: 50px;
    background: #39a7ff;
    border-radius: 5px;
    border: none;
    color: #fff;
    transition: all 300ms;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      box-shadow: 0 0 7px 3px #282c39 inset;
    }
  }
`;
