import React, { useState, useMemo } from 'react';
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
import Layout from '../../components/Layout';
import { Button } from '../../components/Button';
import { registerAction } from './slices';
import { RootState } from '../../store';
import Spinner from '../../components/atoms/spinner';

function RegisterPage({ history, location }: RouteComponentProps) {
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
    loading, appErr, serverErr,
  } = useSelector((state: RootState) => state.auth);

  console.log(appErr, serverErr);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '회원가입';
  }, [loading]);

  return (
    <Layout>
      <Container>
        <Title>
          <Text>
            회원가입
          </Text>
        </Title>
        {appErr || serverErr ? (
          <div>
            {serverErr}
            {' '}
            {appErr}
          </div>
        ) : null}
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
    </Layout>
  );
}

export default RegisterPage;
