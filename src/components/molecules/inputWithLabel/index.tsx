import React from 'react';

import ErrorBox from '^/components/molecules/errorBox';
import {
  StyledLabel,
  Text,
  StyledInput,
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

function InputWithLabel({
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
        value={value || ''}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange(id)}
        error={!!formErrors[id] || !!serverError}
      />
      {formErrors[id] && (
        <ErrorBox>
          {formErrors[id]}
        </ErrorBox>
      )}
    </StyledLabel>
  );
}

export default InputWithLabel;
