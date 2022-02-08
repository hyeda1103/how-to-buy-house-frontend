import styled, { keyframes } from 'styled-components';

const Loading = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
  margin: 0 auto;
  text-indent: -9999em;
  border-top: ${({ theme }) => `0.2rem solid ${theme.palette.common.contrastText}`};
  border-right: ${({ theme }) => `0.2rem solid ${theme.palette.common.contrastText}`};
  border-bottom: ${({ theme }) => `0.2rem solid ${theme.palette.common.contrastText}`};
  border-left: ${({ theme }) => `0.2rem solid ${theme.palette.common.main}`};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${Loading} 1.1s infinite linear;
  animation: ${Loading} 1.1s infinite linear;
  &:after {
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
  }
`;
