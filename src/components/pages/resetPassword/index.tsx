import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  InputWrapper,
  StyledForm,
  Title,
  GuideWrapper,
} from './styles';
import { RootState } from '^/store';
import {
  passwordResetAction,
} from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import InputWithLabel from '^/components/molecules/inputWithLabel';
import ErrorBox from '^/components/molecules/errorBox';
import AuthForm from '^/components/templates/authForm';

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
  }, [formErrors, dispatch, isSubmitting, password, token]);

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

  const title = (
    <Title>
      비밀번호 재설정
    </Title>
  );

  const guide = passwordReset && (
  <GuideWrapper>
    비밀번호가 성공적으로 재설정되었습니다.
    {' '}
    <Link to="/login">로그인</Link>
  </GuideWrapper>
  );

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
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

export default ResetPasswordPage;
