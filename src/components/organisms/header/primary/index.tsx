import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container, Inner, Logo, NavList, NavItem, NavItemWithNoLink, SubLogo, LogoWrapper,
} from './styles';
import Toggle from '^/components/atoms/toggleButton';
import SearchBox from '^/components/molecules/searchBox';
import { RootState } from '^/store';
import { logoutAction } from '^/store/slices/user';

interface Props {
  toggleTheme: () => void
}

function HeaderPrimary({ toggleTheme }: Props) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');

  const { userAuth, userUpdated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userUpdated) {
      setUserName(userUpdated.name);
    } else if (userAuth) {
      setUserName(userAuth.name);
    }
  }, [userAuth, userUpdated]);

  return (
    <Container>
      <Inner>
        <LogoWrapper to="/">
          <Logo />
          <SubLogo>
            <p>여자 둘이 살 집을 구하는 여정</p>
            <p>Since 2021</p>
          </SubLogo>
        </LogoWrapper>
        <SearchBox />
        <NavList>
          {userAuth ? (
            <>
              <NavItem to={`/profile/${userAuth?._id}`}>
                {userName}
                님
              </NavItem>
              <NavItemWithNoLink onClick={() => dispatch(logoutAction())}>로그아웃</NavItemWithNoLink>
            </>
          ) : (
            <NavItem to="/login">로그인</NavItem>
          )}
          {/* <NavItem to="/posts">모든 포스트</NavItem> */}
          {/* <NavItemWithNoLink>
            <Toggle themeToggler={toggleTheme} />
          </NavItemWithNoLink> */}
        </NavList>
      </Inner>
    </Container>
  );
}

export default HeaderPrimary;
