import React, { useState, useEffect, useMemo } from 'react';
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
  ErrorWrapper,
} from './styles';
import { RootState } from '^/store';
import { loginAction } from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import Input from '^/components/molecules/input';

interface IObject {
  [key: string]: string
}
interface Form {
  email: string
  password: string
}

function LoginPage() {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Form>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    email, password,
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

    if (!values.email) {
      errors.email = '이메일 주소를 입력해야 합니다';
    } else if (!regex.test(values.email)) {
      errors.email = '올바르지 않은 이메일 주소입니다';
    }

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
      dispatch(loginAction(formValues));
    }
  }, [formErrors]);

  const {
    loading, error, userAuth,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '로그인';
  }, [loading]);

  const serverError = useMemo(() => {
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
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            label="이메일"
            type="email"
            value={email}
            placeholder="이메일 주소를 입력하세요"
            handleChange={handleChange}
            formErrors={formErrors}
            serverError={serverError}
          />
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
        <GuideWrapper>
          <div>
            <Link
              to="/password-reset-token"
            >
              비밀번호를 잊어버렸어요?
            </Link>
          </div>
          <div>
            새로 오셨나요?
            {' '}
            <Link to="/register">회원가입</Link>
          </div>
        </GuideWrapper>
      </Container>
    </SingleColumnLayout>
  );
}

export default LoginPage;
