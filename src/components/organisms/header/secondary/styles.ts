import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  position: fixed;
  top: 88px;
  z-index: 9;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #979797;
  background-color: ${({ theme }) => theme.palette.main};
`;

export const Inner = styled.div`
  position: relative;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const NavList = styled.div`
  display: flex;
  align-items: center;
`;

const Item = css`
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.palette.nav.item};
  font-size: 13px;

  &:first-child {
    margin-left: 0;
  }
`;

export const NavItem = styled(Link)`
  ${Item}
`;

export const NavItemWithNoLink = styled.span`
  ${Item}
  cursor: pointer;
`;
