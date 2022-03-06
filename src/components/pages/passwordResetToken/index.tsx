import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  StyledForm,
  Title,
  InputWrapper,
  ErrorWrapper,
} from './styles';
import { RootState } from '^/store';
import {
  passwordResetTokenAction,
} from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import InputWithLabel from '^/components/molecules/inputWithLabel';
import AuthForm from '^/components/templates/authForm';

interface IObject {
  [key: string]: string
}
interface Form {
  email: string
}

function PasswordResetTokenPage() {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Form>({
    email: '',
  });
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    email,
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
    return errors;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      dispatch(passwordResetTokenAction(email));
    }
  }, [formErrors, dispatch, email, isSubmitting]);

  const {
    loadingPasswordResetToken, errorPasswordResetToken, passwordToken,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loadingPasswordResetToken) {
      return <Spinner />;
    }
    return '비밀번호 재설정';
  }, [loadingPasswordResetToken]);

  const serverError = useMemo(() => {
    if (errorPasswordResetToken && !Object.keys(formErrors).length && isSubmitting) {
      return errorPasswordResetToken;
    }
    return null;
  }, [errorPasswordResetToken, formErrors, isSubmitting]);

  const title = (
    <Title>
      비밀번호 재설정
    </Title>
  );

  const guide = passwordToken && (
    <p>
      입력한 이메일 주소로 비밀번호 재설정을 위한 링크가 발신되었습니다
    </p>
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
        {serverError && <ErrorWrapper>{serverError}</ErrorWrapper>}
      </InputWrapper>
      <Button type="submit">
        {buttonContent}
      </Button>
    </StyledForm>
  );

  return (
    <SingleColumnLayout>
      <AuthForm
        title={title}
        guide={guide}
        form={form}
      />
    </SingleColumnLayout>
  );
}

export default PasswordResetTokenPage;
