import styled from 'styled-components';

export const SearchBox = styled.label`
  position: relative;
  display: block;
  border-radius: 4px;
  padding: 12px 13px 11px 46px;
  background: #f5f5f5;
  color: #676767;
  //styleName: Smaller;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;

  input {
    border: none;
    background: transparent;
    width: 100%;
    :focus {
      outline: none;
    }
  }
  svg {
    position: absolute;
    top: calc(50% - 22px / 2);
    left: 9px;
  }
`;
