import React, { useState, useEffect, useMemo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  StyledForm,
  Title,
  Text,
  GuideWrapper,
  ErrorWrapper,
} from './styles';
import { RootState } from '^/store';
import { registerAction } from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import Input from '^/components/molecules/input';

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
    const errors: IObject = {};

    if (!values.name) {
      errors.name = '이름을 입력해야 합니다';
    }

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

    if (!values.confirmPassword) {
      errors.confirmPassword = '비밀번호 확인을 입력해야 합니다';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = '비밀번호와 비밀번호 확인이 일치하지 않습니다';
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
      dispatch(registerAction(formValues));
    }
  }, [formErrors]);

  const {
    loading, error, registered,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '회원가입';
  }, [loading]);

  const serverError = useMemo(() => {
    if (error) {
      return error;
    }
    return null;
  }, [error]);

  if (registered) {
    return <Redirect to="/profile" />;
  }

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            회원가입
          </Text>
        </Title>
        {serverError && serverError}
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Input
            id="name"
            label="이름"
            type="name"
            value={name}
            placeholder="이름을 입력하세요"
            handleChange={handleChange}
            formErrors={formErrors}
            serverError={serverError}
          />
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
          <Input
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            placeholder="비밀번호 확인을 입력하세요"
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
          계정이 이미 있나요?
          {' '}
          <Link to="/login">로그인</Link>
        </GuideWrapper>
      </Container>
    </SingleColumnLayout>
  );
}

export default RegisterPage;
