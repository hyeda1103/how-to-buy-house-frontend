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
import { createCategoryAction } from '../../../store/slices/categories';
import Spinner from '../../atoms/spinner';
import { RootState } from '../../../store';

interface Props {
  history: RouteComponentProps['history']
}

function AddCategoryPage({ history }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction({ title: newCategory }));
  };

  const {
    loading, error, category,
  } = useSelector((state: RootState) => state.category);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '추가';
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

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            카테고리 더하기
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

export default AddCategoryPage;
