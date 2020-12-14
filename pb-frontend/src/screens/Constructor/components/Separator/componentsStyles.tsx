import styled from 'styled-components';

export const AddPrevComponentButton = styled.div`
  display: none;
`;

export const SeparatorView = styled.div({
  height: '4px',
  borderRadius: '10px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

export const SeparatorWrapper = styled.div`
  padding: 10px 0;
  &:hover {
    ${SeparatorView} {
      background-color: #58e6ec !important;
      height: '4px';
      border-radius: '10px';
      width: '100%';
      display: 'flex';
      align-items: 'center';
      justify-content: 'center';
      box-sizing: 'border-box';
      ${AddPrevComponentButton} {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10px;
        height: 10px;
        padding: 3px;
        border-radius: 20px;
        border: 2px solid #58e6ec;
        color: #58e6ec;
        font-weight: bold;
        background: #fff;
        z-index: 2;
      }
    }
  }
`;
