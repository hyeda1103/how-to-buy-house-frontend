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
import { fetchUserDetailsAction, updateUserAction } from '^/store/slices/user';
import Spinner from '^/components/atoms/spinner';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import Input from '^/components/molecules/input';

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

interface IObject {
  [key: string]: string
}

interface Form {
  name: string
  email: string
}

function UploadProfilePage({ match }: Props) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Form>({
    name: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    name, email,
  } = formValues;

  useEffect(() => {
    dispatch(fetchUserDetailsAction(id));
  }, [id, dispatch]);

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

    return errorRegisters;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      dispatch(updateUserAction(formValues));
    }
  }, [formErrors, dispatch, isSubmitting, formValues]);

  const {
    loadingUserDetails, errorUserDetails, userDetails, isUpdated,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setFormValues({
      name: userDetails?.name,
      email: userDetails?.email,
    });
  }, [userDetails]);

  const buttonContent = useMemo(() => {
    if (loadingUserDetails) {
      return <Spinner />;
    }
    return '업데이트';
  }, [loadingUserDetails]);

  const serverError = useMemo(() => {
    if (errorUserDetails && !Object.keys(formErrors).length && isSubmitting) {
      return errorUserDetails;
    }
    return null;
  }, [errorUserDetails, formErrors, isSubmitting]);

  if (isUpdated) {
    return <Redirect to={`/profile/${id}`} />;
  }

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            프로필 업데이트
          </Text>
        </Title>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Input
            id="name"
            label="이름"
            type="text"
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
          {serverError && <ErrorWrapper>{serverError}</ErrorWrapper>}
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default UploadProfilePage;
