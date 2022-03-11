import React, { ComponentType } from 'react';
import ReactSelect, {
  components, ActionMeta, SingleValue, StylesConfig, DropdownIndicatorProps, MenuListProps, GroupBase, Options,
} from 'react-select';
import { ReactComponent as CaretUpIcon } from '^/assets/icons/caretUp.svg';
import { ReactComponent as CaretDownIcon } from '^/assets/icons/caretDown.svg';

interface Option {
  value: string | null
  label: string
}

interface Props {
  options: Array<Option>
  handleChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void
  placeholder: string
  customStyles: StylesConfig<Option, false>
}

function DropdownIndicator(props: DropdownIndicatorProps<Option, false, GroupBase<Option>>) {
  const { isFocused } = props;
  return (
    <components.DropdownIndicator {...props}>
      {isFocused ? <CaretUpIcon /> : <CaretDownIcon />}
    </components.DropdownIndicator>
  );
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
      defaultValue={options[0]}
      onChange={handleChange}
      noOptionsMessage={() => 'No Options'}
      placeholder={placeholder}
      menuPortalTarget={document.querySelector('body')}
      styles={customStyles}
      components={{ DropdownIndicator }}
    />
  );
}

export default Dropdown;
