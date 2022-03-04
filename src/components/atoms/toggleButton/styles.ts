import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

import { lightTheme } from '../../../theme';

export const ToggleContainer = styled.button`
  position: relative;
  background: ${({ theme }) => theme.palette.contrastText};
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  padding: 0 0.25rem;
  margin: auto 0;
  margin-left: 0.25rem;
  justify-content: space-between;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

export const SunIcon = styled(FaSun)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.25rem;
  margin: auto 0;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.main};
  opacity: ${({ theme }) => (theme === lightTheme ? '1' : '0')};
  transition: 0.1s ease;
`;

export const MoonIcon = styled(FaMoon)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.25rem;
  margin: auto 0;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.main};
  opacity: ${({ theme }) => (theme === lightTheme ? '0' : '1')};
  transition: 0.1s ease;
`;
