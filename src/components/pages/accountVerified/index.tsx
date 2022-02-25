import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyAccountAction } from '^/store/slices/accountVerification';
import { logoutAction } from '^/store/slices/user';
import { RootState } from '^/store';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';

interface Props {
  match: {
    params: {
      token: string
    }
  }
}

export default function AccountVerified({ match }: Props) {
  const { token } = match.params;
  // dispatch
  const dispatch = useDispatch();
  // verify account
  useEffect(() => {
    dispatch(verifyAccountAction(token));
  }, [dispatch, token]);

  // store
  const accountVerification = useSelector((state: RootState) => state.accountVerification);
  const {
    loading, error, isVerified, verified,
  } = accountVerification;

  return (
    <SingleColumnLayout>
      {verified ? (
        <div>
          <h3>Account Verified</h3>
          <p>
            Your account is now verified. Logout and login back to see
            the changes
          </p>
          <button
            onClick={() => dispatch(logoutAction())}
            type="button"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link
            to="/"
            type="button"
          >
            Go Home
          </Link>
        </div>
      )}
    </SingleColumnLayout>
  );
}
