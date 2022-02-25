import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserListItem from '^/components/organisms/userListItem';

import SingleColumnLayout from '^/components/templates/singleColumnLayout/index';
import { RootState } from '^/store';
import { fetchUsersAction } from '^/store/slices/user';

function UserListPage() {
  const dispatch = useDispatch();
  const {
    usersList, error, loading, block, unblock,
  } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);
  return (
    <SingleColumnLayout>
      {usersList?.length <= 0 ? (
        <h3>No User Found</h3>
      ) : (
        usersList?.map((user) => (
          <UserListItem user={user} />
        ))
      )}
    </SingleColumnLayout>
  );
}

export default UserListPage;
