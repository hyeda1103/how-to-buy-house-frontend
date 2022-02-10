import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
  StyledInput,
} from './styles';
import SingleColumnLayout from '../../templates/singleColumnLayout';
import { Button } from '../../atoms/basicButton';
import { fetchCategoryAction, updateCategoriesAction, deleteCategoriesAction } from '../../../store/slices/categories';
import Spinner from '../../atoms/spinner';
import { RootState } from '../../../store';
import * as T from '../../../types';

interface Props {
  history: RouteComponentProps['history']
  match: {
    params: {
      id: string
    }
  }
}

function UpdateCategoryPage({ history, match }: Props): JSX.Element {
  const { id } = match.params;
  const {
    loading, error, category, isEdited,
  } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState<T.Category['title']>('');

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, [dispatch, id, category.title]);

  useEffect(() => {
    if (category.title) setNewCategory(category.title);
  }, [category.title]);

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

  const { userAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!userAuth) history.push('/');
  }, [history, userAuth]);

  if (isEdited) history.push('/category-list');

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
