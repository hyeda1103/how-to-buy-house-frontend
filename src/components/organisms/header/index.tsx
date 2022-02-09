import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container, Inner, Logo, NavList, NavItem, NavItemWithNoLink,
} from './styles';
import Toggle from '../../atoms/toggleButton';
import { RootState } from '../../../store';
import { logoutAction } from '../../../store/slices/users';

interface Props {
  toggleTheme: () => void
}

function Header({ toggleTheme }: Props) {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: RootState) => state.auth);

  return (
    <Container>
      <Inner>
        <Logo to="/">로고</Logo>
        <NavList>
          {userAuth ? (
            <>
              <NavItem to="/profile">
                { userAuth.name }
                님, 반갑습니다
              </NavItem>
              <NavItem to="/create">생성</NavItem>
              <NavItem to="/post">포스트</NavItem>
              {userAuth.isAdmin && (
                <>
                  <NavItem to="/add-category">카테고리 더하기</NavItem>
                  <NavItem to="/category-list">카테고리 리스트</NavItem>
                </>
              )}
              <NavItem to="/post">포스트</NavItem>
              <NavItemWithNoLink onClick={() => dispatch(logoutAction())}>로그아웃</NavItemWithNoLink>
            </>
          ) : (
            <>
              <NavItem to="/register">회원가입</NavItem>
              <NavItem to="/login">로그인</NavItem>
            </>
          )}
          <NavItemWithNoLink>
            <Toggle themeToggler={toggleTheme} />
          </NavItemWithNoLink>
        </NavList>
      </Inner>
    </Container>
  );
}

export default Header;
