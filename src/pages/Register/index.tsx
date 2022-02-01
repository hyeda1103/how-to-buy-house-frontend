import React, { useState, useMemo } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import {
  Container,
  ErrorWrapper,
  StyledLabel,
  StyledForm,
  Title,
  Text,
  StyledInput,
  GuideWrapper,
} from './styles';
import Layout from '../../components/Layout';
import { Button } from '../../components/Button';

function RegisterPage({ history, location }: RouteComponentProps) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const {
    name, email, password, confirmPassword,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <Layout>
      <Container>
        <Title>
          <Text>
            회원가입
          </Text>
        </Title>
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
          <ErrorWrapper>{message}</ErrorWrapper>
          <Button type="submit">
            회원가입
          </Button>
        </StyledForm>
        <GuideWrapper>
          계정이 이미 있나요?
          {' '}
          <Link to="/login">로그인</Link>
        </GuideWrapper>
      </Container>
    </Layout>
  );
}

export default RegisterPage;
