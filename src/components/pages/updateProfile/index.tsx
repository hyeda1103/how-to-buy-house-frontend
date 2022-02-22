import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
  StyledInput,
} from './styles';
import { RootState } from '../../../store';
import { fetchUserDetailsAction, updateUserAction } from '../../../store/slices/user';
import Spinner from '../../atoms/spinner';
import { Button } from '../../atoms/basicButton';
import SingleColumnLayout from '../../templates/singleColumnLayout/index';

interface Props {
  history: RouteComponentProps['history']
  match: {
    params: {
      id: string
    }
  }
}

function UploadProfilePage({ history, match }: Props) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });

  const {
    name, email,
  } = formValues;

  useEffect(() => {
    dispatch(fetchUserDetailsAction(id));
  }, [id, dispatch]);

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(formValues));
  };

  const {
    loading, error, userDetails, isUpdated,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setFormValues({
      name: userDetails?.name,
      email: userDetails?.email,
    });
  }, [userDetails]);

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

  if (isUpdated) history.push(`/profile/${id}`);
  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            프로필 업데이트
          </Text>
        </Title>
        {errorMessage && errorMessage}
        <StyledForm onSubmit={submitHandler}>
          <StyledLabel htmlFor="name">
            <Text>
              이름
            </Text>
            <StyledInput
              type="name"
              id="name"
              placeholder="이름"
              value={name}
              autoComplete="off"
              onChange={handleChange('name')}
            />
          </StyledLabel>
          <StyledLabel htmlFor="email">
            <Text>
              이메일
            </Text>
            <StyledInput
              type="email"
              id="email"
              placeholder="이메일 주소"
              value={email}
              autoComplete="off"
              onChange={handleChange('email')}
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

export default UploadProfilePage;
