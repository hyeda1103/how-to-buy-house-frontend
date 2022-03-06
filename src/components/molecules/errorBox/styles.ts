import styled from 'styled-components';

import { ReactComponent as Error } from '^/assets/icons/error.svg';

export const ErrorWrapper = styled.div`
  margin: 7px 6px;
  color: ${({ theme }) => theme.palette.fail};

  svg {
    vertical-align: middle;
    display: inline-block;
  }

  span {
    vertical-align: middle;
    display: inline-block;
  }
  
`;

export const ErrorIcon = styled(Error)`
  margin-right: 7px;
`;
