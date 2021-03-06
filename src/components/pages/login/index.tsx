import React, { useState, useEffect, useMemo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  StyledForm,
  Title,
  InputWrapper,
  ArrowForward,
  DirectTo,
} from './styles';
import { RootState } from '^/store';
import { loginAction } from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import InputWithLabel from '^/components/molecules/inputWithLabel';
import ErrorBox from '^/components/molecules/errorBox';
import AuthForm from '^/components/templates/authForm';

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
  }, [formErrors, dispatch, formValues, isSubmitting]);

  const {
    loadingLogin, errorLogin, userAuth,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loadingLogin) {
      return <Spinner />;
    }
    return '로그인';
  }, [loadingLogin]);

  const serverError = useMemo(() => {
    if (errorLogin && !Object.keys(formErrors).length && isSubmitting) {
      return errorLogin;
    }
    return null;
  }, [errorLogin, isSubmitting, formErrors]);

  if (userAuth) {
    return <Redirect to="/" />;
  }

  const title = (
    <Title>
      로그인하기
    </Title>
  );

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="email"
          label="이메일"
          type="email"
          value={email}
          placeholder="이메일 주소를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
          serverError={serverError}
        />
        <InputWithLabel
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
          serverError={serverError}
        />
        {serverError && <ErrorBox>{serverError}</ErrorBox>}
      </InputWrapper>
      <Button type="submit">
        {buttonContent}
      </Button>
    </StyledForm>
  );

  const findPassword = (
    <Link
      to="/password-reset-token"
    >
      <span>
        비밀번호 찾기
      </span>
      <ArrowForward />
    </Link>
  );

  const directTo = (
    <DirectTo>
      새로 오셨나요?
      {' '}
      <Link to="/register">회원가입</Link>
    </DirectTo>
  );

  return (
    <SingleColumnLayout>
      <AuthForm
        title={title}
        form={form}
        findPassword={findPassword}
        directTo={directTo}
      />
    </SingleColumnLayout>
  );
}

export default LoginPage;
