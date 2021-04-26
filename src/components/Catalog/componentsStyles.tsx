import styled from 'styled-components';

export const DroppableComponentContainer = styled.div({
  borderRadius: '20px',
  background: '#69BBFD',
  boxSizing: 'border-box',
  padding: '0 25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 0 15px',
  height: '80px',
  color: '#F9F9F9',
  fontFamily: 'Gotham Pro',
  fontSize: '16px',
  lineHeight: '15px',
  textAlign: 'center',
}, `
  &:first-child {
    border-radius: 20px 20px 0 0;
    height: 50px;
  }
  &:last-child {
    margin-bottom: 0;
    border-radius: 0 0 10px 10px;
    height: 150px;
  }
`);

export const StyledGroupWrapper = styled.div`
  border: 1px solid #F9F9F9;
  border-radius: 20px;
  header {
    border-radius: 20px 20px 0 0;
    background: #f9f9f9;
    padding: 17px 16px 16px;
    color: #6a6a6a;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
  }
  section {
    padding: 16px;
  }
`;
