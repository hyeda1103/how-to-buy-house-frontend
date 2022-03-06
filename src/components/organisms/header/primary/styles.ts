import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImage } from '^/assets/logo/primary.svg';

export const Container = styled.header`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 88px;
  border-bottom: 1px solid #979797;
  background-color: ${({ theme }) => theme.palette.main};
`;

export const Inner = styled.div`
  position: relative;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Logo = styled(LogoImage)`
  display: inline-block;
  height: 26px;
  margin: auto 0;
`;

export const SubLogo = styled.div`
  margin-left: 24px;  
  color: ${({ theme }) => theme.palette.hint};
  p {
    font-size: 8px;
    font-weight: 500;
    line-height: 9.6px;

    &:last-child {
      margin-top: 3px;
    }
  }
`;

export const NavList = styled.div`
  display: flex;
  align-items: center;
`;

const Item = css`
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.palette.nav.item};
`;

export const NavItem = styled(Link)`
  ${Item}
  font-size: 13px;
`;

export const NavItemWithNoLink = styled.span`
  ${Item}
  font-size: 14px;
  cursor: pointer;
`;
