import React from 'react';

import {
  Container, Inner, Logo, NavList, NavItem, NavItemWithNoLink,
} from './styles';
import Toggle from '../../atoms/toggleButton';

interface Props {
  toggleTheme: () => void
}

function Header({ toggleTheme }: Props) {
  return (
    <Container>
      <Inner>
        <Logo to="/">로고</Logo>
        <NavList>
          <NavItem to="/register">회원가입</NavItem>
          <NavItem to="/login">로그인</NavItem>
          <NavItemWithNoLink>
            <Toggle themeToggler={toggleTheme} />
          </NavItemWithNoLink>
        </NavList>
      </Inner>
    </Container>
  );
}

export default Header;
