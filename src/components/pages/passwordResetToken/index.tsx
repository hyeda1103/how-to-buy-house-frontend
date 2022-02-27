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
  fetchUserDetailsAction, passwordResetAction, passwordResetTokenAction, updateUserAction,
} from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

function PasswordResetTokenPage({ match }: Props) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: '',
  });

  const {
    email,
  } = formValues;

  useEffect(() => {
    dispatch(fetchUserDetailsAction(id));
  }, [id, dispatch]);

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(passwordResetTokenAction(email));
  };

  const {
    loading, error, passwordToken,
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

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            비밀번호 재설정
          </Text>
        </Title>
        {passwordToken && (
        <h3>
          Email is successfully sent to your email. Verify it within 10
          minutes.
        </h3>
        )}
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
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default PasswordResetTokenPage;
