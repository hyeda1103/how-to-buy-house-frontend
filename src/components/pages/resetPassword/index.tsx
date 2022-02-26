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
import { RootState } from '^/store';
import {
  passwordResetAction,
} from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';

interface Props {
  history: RouteComponentProps['history']
  match: {
    params: {
      token: string
    }
  }
}

function ResetPasswordPage({ history, match }: Props) {
  const { token } = match.params;
  console.log(token);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    password: '',
  });

  const {
    password,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = {
      password,
      token,
    };
    dispatch(passwordResetAction(data));
  };

  const {
    loading, error, passwordReset,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '비밀번호 재설정';
  }, [loading]);

  const errorMessage = useMemo(() => {
    if (error) {
      return error;
    }
    return null;
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      if (passwordReset) history.push('/login');
    }, 5000);
  }, [passwordReset]);

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            비밀번호 재설정
          </Text>
        </Title>
        {passwordReset && (
        <h3>
          Password Reset Successfully. You will be redirected to login with
          5 seconds.
        </h3>
        )}
        {errorMessage && errorMessage}
        <StyledForm onSubmit={submitHandler}>
          <StyledLabel htmlFor="password">
            <Text>
              새로운 비밀번호
            </Text>
            <StyledInput
              type="password"
              id="password"
              placeholder="새로운 비밀번호"
              value={password}
              autoComplete="off"
              onChange={handleChange('password')}
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

export default ResetPasswordPage;
