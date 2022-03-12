import React, {
  useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  DropDownContainer, DropDownHeader, DropDownList, DropDownListContainer, ListItem,
} from './styles';
import { ReactComponent as CaretUp } from '^/assets/icons/caretUp.svg';
import { ReactComponent as CaretDown } from '^/assets/icons/caretDown.svg';
import useOutsideClick from '^/hooks/useOutsideClick';
import { logoutAction } from '^/store/slices/user';
import { RootState } from '^/store';
import { ReactComponent as ArrowRight } from '^/assets/icons/arrowRight.svg';

interface Props {
  defaultValue?: string
}

function Dropdown({ defaultValue }: Props) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const { userAuth } = useSelector((state: RootState) => state.auth);

  useOutsideClick(ref, () => setIsOpen(!isOpen));

  return (
    <DropDownContainer>
      <DropDownHeader id="dropdown-header" isOpen={isOpen} onClick={toggling}>
        <img src={userAuth?.profilePhoto} alt={userAuth?.name} />
        <p id="dropdown-default">
          {userAuth?.name}
        </p>
        {isOpen
          ? <CaretUp />
          : <CaretDown />}
      </DropDownHeader>
      {isOpen && (
      <DropDownListContainer ref={ref}>
        <DropDownList>
          <ListItem onClick={() => {
            history.push(`/profile/${userAuth?._id}`);
            setIsOpen(!isOpen);
          }}
          >
            <img src={userAuth?.profilePhoto} alt={userAuth?.name} />
            <div>
              <p>
                {userAuth?.name}
              </p>
              <Link to={`/profile/${userAuth?._id}`}>
                <p>마이페이지</p>
                <ArrowRight />
              </Link>
            </div>
          </ListItem>
          <ListItem onClick={() => {
            dispatch(logoutAction());
            setIsOpen(!isOpen);
          }}
          >
            로그아웃
          </ListItem>
        </DropDownList>
      </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

export default Dropdown;
