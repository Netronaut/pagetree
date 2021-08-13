import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 162px;
  background: #24c217;
  border: none;
  border-radius: 3px;
  padding: 10px 16px 11px;
  cursor: pointer;
  transition: all 200ms;

  text-transform: uppercase;
  color: #ffffff;
  //styleName: Medium Bold CTA;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;

  :focus,
  :hover {
    transform: scale(1.02);
    outline: none;
  }
`;
