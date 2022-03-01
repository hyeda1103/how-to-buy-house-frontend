import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
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
import { fetchUserDetailsAction, updateUserAction } from '^/store/slices/user';
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

function UploadProfilePage({ match }: Props) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });

  const {
    name, email,
  } = formValues;

  useEffect(() => {
    dispatch(fetchUserDetailsAction(id));
  }, [id, dispatch]);

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(formValues));
  };

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

  const errorUserDetailsMessage = useMemo(() => {
    if (errorUserDetails) {
      return errorUserDetails;
    }
    return null;
  }, [errorUserDetails]);

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
        {errorUserDetailsMessage && errorUserDetailsMessage}
        <StyledForm onSubmit={submitHandler}>
          <StyledLabel htmlFor="name">
            <Text>
              이름
            </Text>
            <StyledInput
              type="name"
              id="name"
              placeholder="이름"
              value={name}
              autoComplete="off"
              onChange={handleChange('name')}
            />
          </StyledLabel>
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

export default UploadProfilePage;
