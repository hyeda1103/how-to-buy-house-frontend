import styled from 'styled-components';
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
  width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 24px 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(LogoImage)`
  display: inline-block;
  height: 40px;
  margin: auto 0;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 618px;
  justify-content: space-between;
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
`;

export const NavItem = styled.li`
  color: ${({ theme }) => theme.palette.nav.item};
  font-size: 13px;
  font-weight: 700;
  list-style: none;
  cursor: pointer;
`;
