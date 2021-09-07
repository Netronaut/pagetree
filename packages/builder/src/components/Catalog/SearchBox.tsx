import styled from 'styled-components';

export const SearchBox = styled.div`
  position: relative;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 7px 44px 7px 14px;
  margin-bottom: 25px;
  margin-right: 15px;
  * {
    color: #fff;
    background: transparent;
    border: none;
  }
  input {
    width: 100%;
    padding: 0;
    font-size: 16px;
    line-height: 18.75px;
  }
  input:focus {
    outline: none;
  }
  button {
    position: absolute;
    right: 14px;
    top: calc(50% - 8.5px);
    padding: 0;
  }
`;
