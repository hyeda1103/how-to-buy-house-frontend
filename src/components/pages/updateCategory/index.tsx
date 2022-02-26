import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
  StyledInput,
} from './styles';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import { Button } from '^/components/atoms/basicButton';
import { fetchCategoryAction, updateCategoriesAction } from '^/store/slices/category';
import Spinner from '^/components/atoms/spinner';
import { RootState } from '^/store';
import * as T from '^/types';

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

function UpdateCategoryPage({ match }: Props): JSX.Element {
  const { id } = match.params;
  const {
    loading, error, category, isEdited,
  } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState<T.Category['title']>('');

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (category) setNewCategory(category?.title);
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (newCategory) dispatch(updateCategoriesAction({ _id: id, title: newCategory }));
  };

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '업데이트';
  }, [loading]);

  const errorMessage = useMemo(() => {
    if (error) {
      return error;
    }
    return null;
  }, [error]);

  // if (isEdited) {
  //   return <Redirect to="/category-list" />;
  // }

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            카테고리 업데이트
          </Text>
        </Title>
        {errorMessage && errorMessage}
        <StyledForm onSubmit={submitHandler}>
          <StyledLabel htmlFor="category">
            <StyledInput
              type="category"
              id="category"
              placeholder="새로운 카테고리"
              value={newCategory}
              autoComplete="off"
              onChange={handleChange}
            />
          </StyledLabel>
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default UpdateCategoryPage;
