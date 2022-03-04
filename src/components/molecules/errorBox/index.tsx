import React, { ReactChild } from 'react';

import {
  ErrorWrapper,
  ErrorIcon,
} from './styles';

interface Props {
  children: ReactChild
}

function ErrorBox({ children }: Props) {
  return (
    <ErrorWrapper>
      <ErrorIcon />
      <span>
        {children}
      </span>
    </ErrorWrapper>
  );
}

export default ErrorBox;
