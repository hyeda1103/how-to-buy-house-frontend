import styled from 'styled-components';

export const DropDownContainer = styled.div`
  margin: 0 auto;
  z-index: 999;
`;

export const DropDownHeader = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  height: 15px;
  background: #ffffff;
  white-space: nowrap;
  cursor: pointer;
  gap: 7px; 

  p {
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme, isOpen }) => (isOpen
    ? theme.palette.dropdown.focus
    : theme.palette.dropdown.value)};
  }

  svg {
    fill: ${({ theme, isOpen }) => (isOpen
    ? theme.palette.dropdown.focus
    : theme.palette.primary)};
    stroke: ${({ theme, isOpen }) => (isOpen
    ? theme.palette.dropdown.focus
    : theme.palette.dropdown.value)};
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 999;
  top: 71px;
  right: 29px;
`;

export const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.palette.dropdown.focus};
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.dropdown.value};
  width: 143px;
`;

export const ListItem = styled('li')`
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 22px 25px;
  height: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.palette.dropdown.focus};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${({ theme }) => theme.palette.dropdown.focus};
    font-weight: 700;
  }

  img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-right: 8px;
  }

  div {
    p {
      margin-bottom: 3px;
    }
    a {
      display: flex;
      p {
        font-size: 9px;
        white-space: nowrap;
      }
    }
  }
`;
