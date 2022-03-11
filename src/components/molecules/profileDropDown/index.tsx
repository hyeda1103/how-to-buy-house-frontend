import React, {
  useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  DropDownContainer, DropDownHeader, DropDownList, DropDownListContainer, ListItem,
} from './styles';
import { ReactComponent as CaretUp } from '^/assets/icons/caretUp.svg';
import { ReactComponent as CaretDown } from '^/assets/icons/caretDown.svg';
import useOutsideClick from '^/hooks/useOutsideClick';
import { logoutAction } from '^/store/slices/user';

interface Option {
  value: string
  label: string
  action: () => void
}

interface Props {
  defaultValue?: string
}

function Dropdown({ defaultValue }: Props) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const options = [{
    value: 'logout',
    label: '로그아웃',
    action: () => dispatch(logoutAction()),
  }];
  const handleClick = (label: string) => () => {
    setIsOpen(!isOpen);
  };

  useOutsideClick(ref, () => {
    if (isOpen) setIsOpen(!isOpen);
  });

  return (
    <DropDownContainer>
      <DropDownHeader isOpen={isOpen} onClick={toggling}>
        <p>
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
            <ListItem onClick={option.action} key={option.value}>
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
