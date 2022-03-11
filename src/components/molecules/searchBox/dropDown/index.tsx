import React, {
  MouseEventHandler,
  useRef, useState,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {
  DropDownContainer, DropDownHeader, DropDownList, DropDownListContainer, ListItem,
} from './styles';
import { ReactComponent as CaretUp } from '^/assets/icons/caretUp.svg';
import { ReactComponent as CaretDown } from '^/assets/icons/caretDown.svg';
import useOutsideClick from '^/hooks/useOutsideClick';

interface Option {
  value: string
  label: string
}

interface Props {
  options: Array<Option>
  defaultValue?: string
}

function Dropdown({ options, defaultValue }: Props) {
  const { search } = useLocation();
  const history = useHistory();
  const { keyword, category } = queryString.parse(search);

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle: MouseEventHandler = () => setIsOpen(!isOpen);

  const handleSelect: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen(!isOpen);
    history.push(`/search?keyword=${keyword || ''}&category=${e.currentTarget.id}`);
  };

  useOutsideClick(ref, () => {
    if (isOpen) setIsOpen(!isOpen);
  });

  return (
    <DropDownContainer>
      <DropDownHeader id="dropdown-header" isOpen={isOpen} onClick={handleToggle}>
        <p id="dropdown-default">
          {defaultValue}
        </p>
        {isOpen
          ? <CaretUp />
          : <CaretDown />}
      </DropDownHeader>
      {isOpen && (
      <DropDownListContainer ref={ref}>
        <DropDownList>
          {options && Object.values(options).map((option) => (
            <ListItem onClick={handleSelect} key={option.value} id={option.label}>
              {option.label}
            </ListItem>
          ))}
        </DropDownList>
      </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

export default Dropdown;
