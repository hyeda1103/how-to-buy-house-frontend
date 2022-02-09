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
import { registerAction } from '../../../store/slices/users';
import Spinner from '../../atoms/spinner';
import { Button } from '../../atoms/basicButton';
import SingleColumnLayout from '../../templates/singleColumnLayout/index';

function RegisterPage({ history }: RouteComponentProps) {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {
    name, email, password, confirmPassword,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(registerAction(formValues));
  };

  const {
    loading, error, registered,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '회원가입';
  }, [loading]);

  const errorMessage = useMemo(() => {
    if (error) {
      return error;
    }
    return null;
  }, [error]);

  useEffect(() => {
    if (registered) history.push('/profile');
  }, [registered]);

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            회원가입
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
          <StyledLabel htmlFor="confirmPassword">
            <Text>
              비밀번호 확인
            </Text>
            <StyledInput
              type="password"
              id="confirmPassword"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              autoComplete="off"
              onChange={handleChange('confirmPassword')}
            />
          </StyledLabel>
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
        <GuideWrapper>
          계정이 이미 있나요?
          {' '}
          <Link to="/login">로그인</Link>
        </GuideWrapper>
      </Container>
    </SingleColumnLayout>
  );
}

export default RegisterPage;
