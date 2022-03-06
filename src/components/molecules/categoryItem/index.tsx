import React, { MouseEventHandler } from 'react';

import * as T from '^/types';
import { Container } from './styles';

interface Props {
  category: T.Category
  handleClick: any
}

function CategoryItem({ category, handleClick }: Props) {
  const categoryTitle = category.title ? category.title : '모든 포스트';
  return (
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <Container
      key={category._id}
      onClick={handleClick(category.title)}
    >
      {categoryTitle}
    </Container>
  );
}

export default CategoryItem;
