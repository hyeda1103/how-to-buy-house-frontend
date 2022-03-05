import React from 'react';

import SearchIconImage from '^/assets/icons/searchIcon.svg';
import {
  Container,
  SearchInput,
  SearchIcon,
} from './styles';

function SearchBox() {
  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="검색어를 입력해주세요"
      />
      <SearchIcon src={SearchIconImage} alt="search_icon" />
    </Container>
  );
}

export default SearchBox;
