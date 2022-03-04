import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImage } from '^/assets/logo/primary.svg';

export const Container = styled.header`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.contrastText};
  background-color: ${({ theme }) => theme.palette.main};
`;

export const Inner = styled.div`
  position: relative;
  width: 1440px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(LogoImage)`
  display: inline-block;
  /* width: 100px; */
  height: 40px;
  margin: auto 0;
  vertical-align: middle;
`;

export const NavList = styled.div`
  display: flex;
  align-items: center;
`;

const Item = css`
  margin: 0 0.5rem;
`;

export const NavItem = styled(Link)`
  ${Item}
  font-size: 14px;
`;

export const NavItemWithNoLink = styled.span`
  ${Item}
  font-size: 14px;
  cursor: pointer;
`;
