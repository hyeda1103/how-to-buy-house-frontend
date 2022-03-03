import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container, Inner, Logo, NavList, NavItem, NavItemWithNoLink,
} from './styles';
import Toggle from '^/components/atoms/toggleButton';
import { RootState } from '^/store';
import { fetchUserDetailsAction, logoutAction } from '^/store/slices/user';

interface Props {
  toggleTheme: () => void
}

function Header({ toggleTheme }: Props) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');

  const { userAuth, userUpdated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userUpdated) {
      setUserName(userUpdated.name);
    } else if (userAuth) {
      setUserName(userAuth.name);
    }
  }, [userAuth?.name, userUpdated?.name]);

  return (
    <Container>
      <Inner>
        <Logo to="/">로고</Logo>
        <NavList>
          {userAuth ? (
            <>
              <NavItem to={`/profile/${userAuth?._id}`}>
                {userName}
                님, 반갑습니다
              </NavItem>
              <NavItem to="/posts">모든 포스트</NavItem>
              {userAuth?.isAdmin && (
                <>
                  <NavItem to="/create-post">글쓰기</NavItem>
                  <NavItem to="/add-category">카테고리 더하기</NavItem>
                  <NavItem to="/category-list">카테고리 리스트</NavItem>
                </>
              )}
              <NavItemWithNoLink onClick={() => dispatch(logoutAction())}>로그아웃</NavItemWithNoLink>
            </>
          ) : (
            <>
              <NavItem to="/register">회원가입</NavItem>
              <NavItem to="/login">로그인</NavItem>
              <NavItem to="/posts">모든 포스트</NavItem>
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
