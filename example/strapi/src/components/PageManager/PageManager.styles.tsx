import styled from 'styled-components';

const PageList = styled.div`
  position: relative;
  max-width: 80vw;
  margin: 0 auto;
  > p {
    margin-top: 30px;
    color: #666;
    font-size: 12px;
  }
`;

const AddPageInput = styled.div`
  --color-primary: hsla(200, 100%, 50%, 1);
  --color-secondary: hsla(0, 0%, 90%, 1);
  postition: relative;
  display: flex;

  input {
    flex: 1 1 100%;
    border: 2px solid var(--color-secondary);
    border-radius: 5px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 0 5px;
    font-size: 18px;
    line-height: 2;
    border-color: var(--color-secondary);
    + button:disabled {
      display: none;
    }
    :focus {
      :not(:placeholder-shown) {
        border-color: var(--color-primary);
      }
      :empty {
        + button:disabled {
          display: none;
        }
      }
    }
  }
  button {
    flex: 1 1 20ch;
    line-height: 2;
  }
`;

const FilterInput = styled(AddPageInput)`
  width: 40%;
  input {
    flex: 1 1 100%;
  }
  button {
    flex: 1 4 14ch;
  }
`;

const PageListItem = styled.div`
  border: 1px solid transparent;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  :hover {
    border: 1px solid hsla(201, 100%, 47%, 0.2);
    background: #fbfbfb;
  }
  a {
    display: block;
  }
  a h4 {
    line-height: 2;
    margin: 0;
    padding: 0;
  }
`;

const PageItemTitle = styled.div`
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
    :hover {
      color: #000;
    }
  }
`;

const PageItemButton = styled.button<{ destructive?: boolean }>`
  --color-destructive: hsla(10, 100%, 45%, 1);
  --color-primary: hsla(200, 100%, 50%, 1);
  --color-secondary: hsla(0, 0%, 90%, 1);
  flex: 0 1 20ch;
  border-radius: 5px;
  background: transparent;
  border: 2px solid
    ${({ destructive }) => (destructive ? 'var(--color-secondary)' : 'var(--color-primary)')};
  color: ${({ destructive }) => (destructive ? 'var(--color-secondary)' : 'var(--color-primary)')};
  :hover {
    border-color: ${({ destructive }) =>
      destructive ? 'var(--color-destructive)' : 'var(--color-primary)'};
    color: white;
    background: ${({ destructive }) =>
      destructive ? 'var(--color-destructive)' : 'var(--color-primary)'};
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
  flex-direction: column;
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
    line-height: 2;
  }
  input {
    border: 2px solid #dadada;
    border-radius: 5px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 0 5px;
    font-size: 16px;
    line-height: 2;
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
    display: block;
    color: #aaa;
    font-size: 11px;
    margin: 15px 5px 5px;
  }
  button:last-child {
    margin-top: 24px;
    width: calc(60% - 20ch);
    max-height: 44px;
  }
`;

export default {
  PageList,
  AddPageInput,
  FilterInput,
  PageListItem,
  PageManagerModal,
  PageItemTitle,
  PageItemButton,
};
