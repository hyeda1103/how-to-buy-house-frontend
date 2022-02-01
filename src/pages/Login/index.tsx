import React, { useState, useEffect, useMemo } from 'react';
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

function LoginPage({ history, location }: RouteComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <Layout>
      <Container>
        <Title>
          <Text>
            로그인
          </Text>
        </Title>
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
              autoComplete="on"
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledLabel>
          <Button type="submit">
            로그인
          </Button>
        </StyledForm>
        <GuideWrapper>
          새로 오셨어요?
          {' '}
          <Link to="/register">회원가입</Link>
        </GuideWrapper>
      </Container>
    </Layout>
  );
}

export default LoginPage;
