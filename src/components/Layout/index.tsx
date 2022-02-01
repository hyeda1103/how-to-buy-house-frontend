import React from 'react';
import { Container, Inner } from './styles';

interface IProps {
  children: JSX.Element
}

function Layout({ children }: IProps) {
  return (
    <Container>
      <Inner>
        {children}
      </Inner>
    </Container>
  );
}

export default Layout;
