import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  position: relative;
  border: none;
  border-bottom: 2px solid #757575;
  width: 560px;
  height: 35px;
  outline: none;
  padding: 0 1px;
  font-size: 13px;
  line-height: 15.23px;

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => theme.palette.hint};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.palette.hint};
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: ${({ theme }) => theme.palette.hint};
  }
`;

export const SearchIcon = styled.img`
  position: absolute;
  display: inline-block;
  right: 1px;
  bottom: 8.39px;
  width: 18.22px;
  height: 18.22px;
`;
