import React, {
  ChangeEvent, FormEventHandler, useState, useEffect, useCallback, ChangeEventHandler,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StylesConfig } from 'react-select';
import { useSelector, useDispatch } from 'react-redux';

import SearchIconImage from '^/assets/icons/searchIcon.svg';
import { Category } from '^/types';
import { RootState } from '^/store';
import { fetchCategoriesAction } from '^/store/slices/category';
import {
  SearchWrapper,
  Form,
  SearchInput,
  SearchIcon,
} from './styles';
import DropDown from './dropDown';

interface Props {
  history: RouteComponentProps['history']
}
interface Option {
  value: string
  label: string
}

function SearchBox({ history }: Props) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState<Array<Option>>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    history.push(`/search?keyword=${keyword}&category=${category}`);
  };

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const { categoryList, loading: loadingCategoryList, error: errorCategoryList } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    const selectOptions = categoryList?.map((categoryItem: Category) => ({
      value: categoryItem._id,
      label: categoryItem.title,
    }));
    setOptions(selectOptions);
  }, [categoryList]);

  return (
    <SearchWrapper>
      {options && (
        <DropDown
          options={options}
          defaultValue="카테고리"
        />
      )}
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={handleChange}
        />
        <SearchIcon src={SearchIconImage} alt="search_icon" />
      </Form>
    </SearchWrapper>
  );
}

export default withRouter(SearchBox);
