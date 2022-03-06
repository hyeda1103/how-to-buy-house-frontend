import React, {
  ChangeEvent, FormEventHandler, useState, useEffect, useCallback,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import SearchIconImage from '^/assets/icons/searchIcon.svg';
import Dropdown from '^/components/atoms/dropDown';
import { Category } from '^/types';
import { RootState } from '^/store';
import { fetchCategoriesAction } from '^/store/slices/category';
import {
  SearchWrapper,
  Form,
  SearchInput,
  SearchIcon,
} from './styles';

interface Props {
  history: RouteComponentProps['history']
}
interface Option {
  value: string | null
  label: string
}

const customStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    background: '#ffffff',
    fontSize: '13px',
    border: 'none',
    color: '#737575',
    minHeight: '24px',
    height: '24px',
    boxShadow: state.isFocused ? '0' : '0',
    cursor: 'pointer',
  }),
  // 선택 옵션
  option: (provided, state) => ({
    ...provided,
    display: 'inline',
    padding: '1px 5px',
    margin: '2px',
    borderRadius: '5px',
    backgroundColor: '#4D75D9',
    color: '#ffffff',
    fontSize: '13px',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#3C48C9',
      color: '#ffffff',
    },
  }),
  input: (provided) => ({
    ...provided,
    height: '24px',
    width: 'auto',
    margin: 0,
    padding: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '24px',
    width: 'auto',
    margin: 0,
    padding: 0,
  }),
  // 선택한 값
  singleValue: (provided) => ({
    ...provided,
    color: '#737575',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '24px',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    height: '0',
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 999,
    padding: 0,

  }),
  menuList: (provided) => ({
    ...provided,
    position: 'fixed',
    padding: '8px',
    width: '240px',
    maxHeight: '120px',
    display: 'inline',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '1px 1px 5px #888888',

    '::-webkit-scrollbar': {
      width: '4px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
};

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

  const handleSelectChange = useCallback((e) => {
    setCategory(e.label);
    history.push(`/search?keyword=${keyword}&category=${e.label}`);
  }, [keyword]);

  return (
    <SearchWrapper>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={handleChange}
        />
        <SearchIcon src={SearchIconImage} alt="search_icon" />
      </Form>
      {options && (
        <Dropdown
          options={options}
          handleChange={handleSelectChange}
          placeholder="카테고리"
          customStyles={customStyles}
        />
      )}
    </SearchWrapper>
  );
}

export default withRouter(SearchBox);
