import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import * as T from '^/types';
import { blockUserAction, unBlockUserAction } from '^/store/slices/user';

interface Props {
  user: T.User
}

function UserListItem({ user }: Props): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: '/send-mail',
      state: {
        email: user?.email,
        id: user?._id,
      },
    });
  };
  return (
    <div key={user._id}>
      <img src={user.profilePhoto} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>
        {user.followers.length}
        {' '}
        팔로워
      </p>
      <p>
        {user.posts?.length}
        {' '}
        개의 포스트
      </p>
      <Link
        to={`/profile/${user?._id}`}
      >
        프로필 보기
      </Link>
      {user.isBlocked ? (
        <button type="button" onClick={() => dispatch(unBlockUserAction(user._id))}>
          UNBLOCK
        </button>
      ) : (
        <button type="button" onClick={() => dispatch(blockUserAction(user._id))}>
          BLOCK
        </button>
      )}
      <button type="button" onClick={handleClick}>
        메일 보내기
      </button>
    </div>
  );
}

export default UserListItem;
