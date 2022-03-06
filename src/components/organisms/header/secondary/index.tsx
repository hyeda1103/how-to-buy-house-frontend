import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container, Inner, NavList, NavItem,
} from './styles';
import { RootState } from '^/store';

function HeaderSecondary() {
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
        <NavList>
          <NavItem to="/create-post">글쓰기</NavItem>
          <NavItem to="/add-category">카테고리 더하기</NavItem>
          <NavItem to="/category-list">카테고리 리스트</NavItem>
        </NavList>
      </Inner>
    </Container>
  );
}

export default HeaderSecondary;
