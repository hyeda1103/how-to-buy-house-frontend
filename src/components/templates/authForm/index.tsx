import React from 'react';

import {
  Container,
  TitleWrapper,
  GuideWrapper,
  FormWrapper,
  FindPasswordWrapper,
  DirectToWrapper,
} from './styles';

interface Props {
  title: React.ReactChild | JSX.Element[] | JSX.Element | null
  guide?: React.ReactChild | JSX.Element[] | JSX.Element | null
  form: React.ReactChild | JSX.Element[] | JSX.Element | null
  findPassword?: React.ReactChild | JSX.Element[] | JSX.Element | null
  directTo?: React.ReactChild | JSX.Element[] | JSX.Element | null
}

function AuthForm({
  title,
  guide,
  form,
  findPassword,
  directTo,
}: Props) {
  return (
    <Container>
      <TitleWrapper>
        {title}
      </TitleWrapper>
      <GuideWrapper>
        {guide}
      </GuideWrapper>
      <FormWrapper>
        {form}
      </FormWrapper>
      {findPassword && (
      <FindPasswordWrapper>
        {findPassword}
      </FindPasswordWrapper>
      )}
      {directTo && (
      <DirectToWrapper>
        {directTo}
      </DirectToWrapper>
      )}
    </Container>
  );
}

export default AuthForm;
