import styled from 'styled-components';

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 53px;
`;

export const Form = styled.form`
  position: relative;
  height: 38px;
`;

export const SearchInput = styled.input`
  position: relative;
  border: none;
  border-bottom: 2px solid #757575;
  width: 380px;
  height: 100%;
  outline: none;
  padding: 0 24px 0 1px;
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
  height: 18px;
  width: 18px;
  top: 50%;
  margin-top: -9px;
  right: 2px;
`;
