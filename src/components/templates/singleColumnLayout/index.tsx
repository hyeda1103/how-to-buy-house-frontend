import React from 'react';
import { Container, Inner } from './styles';

interface Props {
  children: React.ReactChild | JSX.Element[] | JSX.Element | null
}

function SingleColumnLayout({ children }: Props) {
  return (
    <Container>
      <Inner>
        {children}
      </Inner>
    </Container>
  );
}

export default SingleColumnLayout;
