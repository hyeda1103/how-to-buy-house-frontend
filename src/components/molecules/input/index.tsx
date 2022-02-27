import React from 'react';

import {
  StyledLabel,
  Text,
  StyledInput,
  ErrorWrapper,
} from './styles';

interface IObject {
  [key: string]: string
}

interface Props {
  id: string
  label: string
  type: string
  value: string
  placeholder: string
  handleChange: (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
  formErrors: IObject
  serverError: string | null
}

function Input({
  id, label, type, value, placeholder, handleChange, formErrors, serverError,
}: Props) {
  return (
    <StyledLabel htmlFor={id}>
      <Text>
        {label}
      </Text>
      <StyledInput
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange(id)}
        error={!!formErrors[type] || !!serverError}
      />
      {formErrors[id] && (
      <ErrorWrapper>{formErrors[id]}</ErrorWrapper>
      )}
    </StyledLabel>
  );
}

export default Input;
