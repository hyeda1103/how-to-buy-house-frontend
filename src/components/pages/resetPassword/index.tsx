import React, { useState, useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  StyledForm,
  Title,
  Text,
  ErrorWrapper,
} from './styles';
import { RootState } from '^/store';
import {
  passwordResetAction,
} from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import Input from '^/components/molecules/input';

interface Props {
  match: {
    params: {
      token: string
    }
  }
}

interface IObject {
  [key: string]: string
}
interface Form {
  password: string
}

function ResetPasswordPage({ match }: Props) {
  const { token } = match.params;
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Form>({
    password: '',
  });
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    password,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: Form) => {
    const errors: IObject = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.password) {
      errors.password = '비밀번호를 입력해야 합니다';
    } else if (values.password.length < 4) {
      errors.password = '비밀번호는 적어도 네 글자 이상입니다';
    }

    return errors;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      const data = {
        password,
        token,
      };
      dispatch(passwordResetAction(data));
    }
  }, [formErrors]);

  const {
    loadingPasswordReset, errorPasswordReset, passwordReset,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loadingPasswordReset) {
      return <Spinner />;
    }
    return '비밀번호 재설정';
  }, [loadingPasswordReset]);

  const serverError = useMemo(() => {
    if (errorPasswordReset && !Object.keys(formErrors).length && isSubmitting) {
      return errorPasswordReset;
    }
    return null;
  }, [errorPasswordReset, formErrors, isSubmitting]);

  useEffect(() => {
    setTimeout(() => {
      if (passwordReset) {
        return <Redirect to="/login" />;
      }
      return null;
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
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Input
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            handleChange={handleChange}
            formErrors={formErrors}
            serverError={serverError}
          />
          {serverError && <ErrorWrapper>{serverError}</ErrorWrapper>}
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default ResetPasswordPage;
