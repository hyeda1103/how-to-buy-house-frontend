import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container, Inner, Logo, NavList, NavItem, NavItemWithNoLink, SubLogo, LogoWrapper,
} from './styles';
import Toggle from '^/components/atoms/toggleButton';
import SearchBox from '^/components/molecules/searchBox';
import { RootState } from '^/store';
import { logoutAction } from '^/store/slices/user';
import HeaderPrimary from './primary';
import HeaderSecondary from './secondary';

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

  return (
    <>
      <HeaderPrimary toggleTheme={toggleTheme} />
      {userAuth?.isAdmin && <HeaderSecondary />}
    </>
  );
}

export default Header;
