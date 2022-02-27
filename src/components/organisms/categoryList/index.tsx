import React from 'react';

import * as T from '^/types';
import { Container } from './styles';
import CategoryItem from '^/components/molecules/categoryItem';

const categoryAll: T.Category = {
  _id: 'default',
  user: 'admin',
  title: '',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
};

interface Props {
  categoryList: Array<T.Category>
  handleClick: any
}

function CategoryList({ categoryList, handleClick }: Props) {
  return (
    <Container>
      <CategoryItem
        category={categoryAll}
        handleClick={handleClick}
      />
      {categoryList && (
        categoryList.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            handleClick={handleClick}
          />
        ))
      )}
    </Container>
  );
}

export default CategoryList;
