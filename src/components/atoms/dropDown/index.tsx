import React, { FocusEventHandler, ReactNode } from 'react';
import ReactSelect, { ActionMeta, SingleValue, StylesConfig } from 'react-select';

interface Option {
  value: string
  label: string
}

interface Props {
  options: Array<Option>
  handleChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void
  placeholder: string
  customStyles: StylesConfig<Option, false>
}

function Dropdown({
  options,
  handleChange,
  placeholder,
  customStyles,
}: Props): JSX.Element {
  return (
    <ReactSelect
      options={options}
      onChange={handleChange}
      noOptionsMessage={() => 'No Options'}
      placeholder={placeholder}
      menuPortalTarget={document.querySelector('body')}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
        },
      })}
    />
  );
}

export default Dropdown;
