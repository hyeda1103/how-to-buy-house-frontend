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
  GuideWrapper,
} from './styles';
import { RootState } from '../../../store';
import { loginAction } from '../../../store/slices/user';
import Spinner from '../../atoms/spinner';
import { Button } from '../../atoms/basicButton';
import SingleColumnLayout from '../../templates/singleColumnLayout/index';

function LoginPage({ history }: RouteComponentProps) {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const {
    email, password,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(loginAction(formValues));
  };

  const {
    loading, error, userAuth,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '로그인';
  }, [loading]);

  const errorMessage = useMemo(() => {
    if (error) {
      return error;
    }
    return null;
  }, [error]);

  useEffect(() => {
    if (userAuth) history.push('/');
  }, [userAuth]);

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            로그인
          </Text>
        </Title>
        {errorMessage && errorMessage}
        <StyledForm onSubmit={submitHandler}>
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
          <StyledLabel htmlFor="password">
            <Text>
              비밀번호
            </Text>
            <StyledInput
              type="password"
              id="password"
              placeholder="비밀번호"
              value={password}
              autoComplete="off"
              onChange={handleChange('password')}
            />
          </StyledLabel>
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
        <GuideWrapper>
          새로 왔나요?
          {' '}
          <Link to="/register">회원가입</Link>
        </GuideWrapper>
      </Container>
    </SingleColumnLayout>
  );
}

export default LoginPage;
