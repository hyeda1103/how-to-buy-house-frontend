import React, { useState, useEffect, useMemo } from 'react';
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
  passwordResetTokenAction,
} from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import Input from '^/components/molecules/input';

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
  }, [formErrors]);

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
    if (errorPasswordResetToken) {
      return errorPasswordResetToken;
    }
    return null;
  }, [errorPasswordResetToken]);

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
          {serverError && <ErrorWrapper>{serverError}</ErrorWrapper>}
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default PasswordResetTokenPage;
