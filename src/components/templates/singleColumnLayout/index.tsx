import React from 'react';
import { Container, Inner } from './styles';

interface IProps {
  children: JSX.Element
}

function SingleColumnLayout({ children }: IProps) {
  return (
    <Container>
      <Inner>
        {children}
      </Inner>
    </Container>
  );
}

export default SingleColumnLayout;
