import React, { useState, useMemo } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import { RootState } from '^/store';
import { loginAction } from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';

function LoginPage() {
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

  if (userAuth) {
    return <Redirect to="/" />;
  }

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
          <div>
            새로 왔나요?
            {' '}
            <Link to="/register">회원가입</Link>
          </div>
          <div>
            <Link
              to="/password-reset-token"
            >
              비밀번호를 잊어버렸어요?
            </Link>
          </div>
        </GuideWrapper>
      </Container>
    </SingleColumnLayout>
  );
}

export default LoginPage;
