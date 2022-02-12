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
import Spinner from '../../atoms/spinner';
import { Button } from '../../atoms/basicButton';
import SingleColumnLayout from '../../templates/singleColumnLayout/index';

function ProfilePage({ history }: RouteComponentProps) {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });

  const {
    name, email,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const {
    loading, error, userAuth,
  } = useSelector((state: RootState) => state.auth);

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

  useEffect(() => {
    if (userAuth) {
      setFormValues({
        name: userAuth.name,
        email: userAuth.email,
      });
    }
  }, [userAuth]);

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            회원정보
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

export default ProfilePage;
