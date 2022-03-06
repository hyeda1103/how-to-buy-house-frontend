import React, { useState, useEffect, useMemo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  StyledForm,
  Title,
  DirectToWrapper,
  InputWrapper,
} from './styles';
import { RootState } from '^/store';
import { registerAction } from '^/store/slices/user';
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
  name: string
  email: string
  password: string
  confirmPassword: string
}

function RegisterPage() {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    name, email, password, confirmPassword,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: Form) => {
    const errorRegisters: IObject = {};

    if (!values.name) {
      errorRegisters.name = '이름을 입력해야 합니다';
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errorRegisters.email = '이메일 주소를 입력해야 합니다';
    } else if (!regex.test(values.email)) {
      errorRegisters.email = '올바르지 않은 이메일 주소입니다';
    }

    if (!values.password) {
      errorRegisters.password = '비밀번호를 입력해야 합니다';
    } else if (values.password.length < 4) {
      errorRegisters.password = '비밀번호는 적어도 네 글자 이상입니다';
    }

    if (!values.confirmPassword) {
      errorRegisters.confirmPassword = '비밀번호 확인을 입력해야 합니다';
    } else if (values.password !== values.confirmPassword) {
      errorRegisters.confirmPassword = '비밀번호와 비밀번호 확인이 일치하지 않습니다';
    }

    return errorRegisters;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      dispatch(registerAction(formValues));
    }
  }, [formErrors, dispatch, isSubmitting, formValues]);

  const {
    loadingRegister, errorRegister, registered,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loadingRegister) {
      return <Spinner />;
    }
    return '회원가입';
  }, [loadingRegister]);

  const serverError = useMemo(() => {
    if (errorRegister && !Object.keys(formErrors).length && isSubmitting) {
      return errorRegister;
    }
    return null;
  }, [errorRegister, formErrors, isSubmitting]);

  if (registered) {
    return <Redirect to="/profile" />;
  }

  const title = (
    <Title>
      가입하기
    </Title>
  );

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="name"
          label="이름"
          type="text"
          value={name}
          placeholder="이름을 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
          serverError={serverError}
        />
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
        <InputWithLabel
          id="confirmPassword"
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          placeholder="비밀번호 확인을 입력하세요"
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

  const directTo = (
    <DirectToWrapper>
      새로 오셨나요?
      {' '}
      <Link to="/login">로그인</Link>
    </DirectToWrapper>
  );

  return (
    <SingleColumnLayout>
      <AuthForm
        title={title}
        form={form}
        directTo={directTo}
      />
    </SingleColumnLayout>
  );
}

export default RegisterPage;
