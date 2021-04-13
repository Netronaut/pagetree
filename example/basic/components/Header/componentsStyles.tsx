import styled from 'styled-components';

export const HeadWrapper = styled.header`
  display: grid;
  grid-template: 1fr / 1fr minmax(auto, 200px) minmax(auto, 600px) 1fr;
  background: #282C39;
`;
export const HeadContent = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: end;
  align-items: center;
  grid-column: 3 / 4;
`;

export const Logo = styled.img`
  width: 174px;
  grid-column: 2 / 3;
`;