import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Toggle from '^/components/atoms/toggleButton';
import SearchBox from '^/components/molecules/searchBox';
import { RootState } from '^/store';
import { logoutAction } from '^/store/slices/user';
import ProfileDropdown from '^/components/molecules/profileDropDown';
import {
  Container, Inner, Logo, NavList, NavItem, Wrapper,
} from './styles';

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
  }, [userAuth, userUpdated]);

  const options = [{
    label: 'logout',
    value: 'logout',
    action: () => dispatch(logoutAction()),
  }];

  return (
    <Container>
      <Inner>
        <Link to="/">
          <Logo />
        </Link>
        <Wrapper>
          <SearchBox />
          <NavList>
            {userAuth ? (
              <>
                <ProfileDropdown
                  defaultValue={userName}
                />
                {/* <Link to={`/profile/${userAuth?._id}`}>
                  <NavItem>
                    {userName}
                    님
                  </NavItem>
                </Link>
                <NavItem onClick={() => dispatch(logoutAction())}>
                  로그아웃
                </NavItem> */}
              </>
            ) : (
              <Link to="/login">
                <NavItem>
                  로그인
                </NavItem>
              </Link>
            )}
            {/* <NavItem>
              <Toggle themeToggler={toggleTheme} />
            </NavItem> */}
          </NavList>
        </Wrapper>
      </Inner>
    </Container>
  );
}

export default Header;
