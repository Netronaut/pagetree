import styled from 'styled-components';

const PageManager = styled.div`
  position: relative;
  max-width: 80vw;
  margin: 0 auto;
  & > p {
    margin-top: 30px;
    color: #666;
    font-size: 12px;
  }
`;

const PageManagerAdd = styled.div`
  postition: relative;
  input {
    border: 2px solid #dadada;
    border-radius: 5px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 0 5px;
    font-size: 16px;
    line-height: 34px;
    font-size: 18px;
  }
  input:focus:empty {
    border-style: solid;
    border-color: #999;
  }
  input:focus:not(:placeholder-shown) {
    border-color: hsla(201, 100%, 47%, 1) !important;
  }
  input:focus:empty + button:disabled {
    display: none;
  }
  input:focus + button:not(:disabled) {
    background: hsla(201, 100%, 47%, 1);
  }
  input + button:disabled {
    display: none;
  }
  input:focus:empty + button:disabled {
    display: none;
  }
  button {
    position: absolute;
    right: -2px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    box-sizing: border-box;
    text-transform: uppercase;
    font-size: 16px;
    color: #fff;
    line-height: 36px;
    padding: 0 10px;
    border: none;
  }
`;

const PageManagerRow = styled.div`
  border: 1px solid transparent;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  &:hover {
    border: 1px solid hsla(201, 100%, 47%, 0.2);
    background: #fbfbfb;
  }
  a {
    display: block;
  }
  a h4 {
    line-height: 28px;
    margin: 0;
    padding: 0;
  }
`;

const PageManagerRowTitle = styled.div`
  flex: 1 1 60%;
  min-width: 50vw;
  a {
    width: 100%;
    text-decoration: none;
    font-size: 12px;
    color: #555;
    h4 {
      color: hsla(201, 100%, 47%, 1);
      font-size: 20px;
    }
    h4,
    p {
      padding: 0;
      margin: 0 40px 0 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover {
      color: #000;
    }
  }
`;

const PageManagerRowButton = styled.button`
  flex: 0 1 20ch;
  color: hsla(201, 100%, 47%, 1);
  border-radius: 5px;
  background: transparent;
  border: 2px solid hsla(201, 100%, 47%, 1);
  &:hover:not(.destructive) {
    border: 2px solid hsla(201, 100%, 47%, 1);
    background: hsla(201, 100%, 47%, 1);
    color: #fff;
    box-shadow: 0 0 4px rgba(33, 33, 33, 0.3);
  }
  &.destructive {
    border-color: #dadada;
    color: #dadada;
    &:hover {
      color: #fff;
      border-color: red;
      background-color: red;
      box-shadow: 0 0 4px rgba(33, 33, 33, 0.3);
    }
  }
`;

const PageManagerModal = styled.div`
  border: 2px solid #fff;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 8px hsla(201, 70%, 47%, 0.5);
  position: fixed;
  top: 30%;
  left: calc(50% - 30vw);
  width: 60vw;
  background: #fafafa;
  padding: 20px;
  display: flex;
  place-items: center;
  button:first-child {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 26px;
    height: 26px;
    border: 2px solid hsla(201, 100%, 47%, 1);
    background: #fff;
    color: hsla(201, 100%, 47%, 1);
    border-radius: 50%;
    display: grid;
    place-content: center;
    line-height: 12px;
  }
  input {
    border: 2px solid #dadada;
    border-radius: 5px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 0 5px;
    font-size: 16px;
    line-height: 34px;
    font-size: 18px;
  }
  input:focus:empty {
    border-style: solid;
    border-color: #999;
  }
  input:focus:not(:placeholder-shown) {
    border-color: hsla(201, 100%, 47%, 1) !important;
  }
  input:focus + button:not(:disabled) {
    background: hsla(201, 100%, 47%, 1);
  }
  label {
    flex: 1 0 calc(100% - 20ch);
  }
  label span {
    color: #aaa;
    font-size: 11px;
  }
  button:last-child {
    margin-top: 14px;
    flex: 1 0 20ch;
    right: 0;
    height: 38px;
  }
`;

export default {
  PageManager,
  PageManagerAdd,
  PageManagerRow,
  PageManagerModal,
  PageManagerRowTitle,
  PageManagerRowButton,
};
