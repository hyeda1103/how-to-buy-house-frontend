import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  userProfileAction,
  followUserAction,
  unfollowUserAction,
} from '^/store/slices/user';
import { RootState } from '^/store';
import DateFormatter from '^/utils/dateFormatter';
import * as T from '^/types';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

export default function Profile({ match }: Props) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    profile,
    profileLoading,
    profileError,
    followed,
    unFollowed,
    userAuth,
  } = useSelector((state: RootState) => state.auth);

  // fetch user profile
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unFollowed]);

  // send mail handle click
  const sendMailNavigate = () => {
    history.push({
      pathname: '/send-mail',
      state: {
        email: profile?.email,
        id: profile?._id,
      },
    });
  };

  // isLogin

  const isLoginUser = userAuth?._id === profile?._id;

  return (
    <SingleColumnLayout>
      {/* Static sidebar for desktop */}
      <main>
        <article>
          {/* Profile header */}
          <div>
            <div>
              <img
                src={profile?.profilePhoto}
                alt={profile?.firstName}
              />
              <div>
                <h1>
                  {profile?.name}
                  <span>
                    {profile?.accountType}
                  </span>
                  {/* Display if verified or not */}
                  {profile?.isAccountVerified ? (
                    <span>
                      Account Verified
                    </span>
                  ) : (
                    <span>
                      Unverified Account
                    </span>
                  )}
                </h1>
                <p>
                  Date Joined:
                  {' '}

                  <DateFormatter date={profile?.createdAt} />
                  {' '}
                </p>
                <p>
                  {profile?.posts?.length}
                  {' '}
                  posts
                  {' '}
                  {profile?.followers?.length}
                  {' '}
                  followers
                  {' '}
                  {profile?.following?.length}
                  {' '}
                  following
                </p>
                {/* Who view my profile */}
                <span>
                  Number of viewers
                  {' '}
                  {profile?.viewedBy?.length}
                </span>

                {/* is login user */}
                {/* Upload profile photo */}
                {isLoginUser && (
                <Link
                  to="/upload-profile-photo"
                >
                  <span>Upload Photo</span>
                </Link>
                )}
              </div>
              <div>
                {/* // Hide follow button from the same */}
                {!isLoginUser && (
                <div>
                  {profile?.isFollowing ? (
                    <button
                      type="button"
                      onClick={() => dispatch(unfollowUserAction(id))}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(followUserAction(id))}
                      type="button"
                    >
                      <span>Follow </span>
                      <span>
                        {profile?.followers?.length}
                      </span>
                    </button>
                  )}
                </div>
                )}
                {/* Update Profile */}
                {isLoginUser && (
                <Link
                  to={`/update-profile/${profile?._id}`}
                >
                  <span>Update Profile</span>
                </Link>
                )}
                {/* Send Mail */}
                <button
                  type="button"
                  onClick={sendMailNavigate}
                >
                  Send Message
                </button>
              </div>
            </div>
            <h1>
              {profile?.name}
            </h1>
          </div>
          {/* Tabs */}
          <div>
            <div>
              <h1>
                Who viewed my profile :
                {' '}
                {profile?.viewedBy?.length}
              </h1>
              {/* Who view my post */}
              <ul>
                {profile?.viewedBy?.length <= 0 ? (
                  <h1>No Viewer</h1>
                ) : (
                  profile?.viewedBy?.map((user: T.User) => (
                    <li key={user._id}>
                      <div>
                        <img
                          src={user?.profilePhoto}
                          alt={user?.name}
                        />
                        <div>
                          <h3>
                            {user?.name}
                          </h3>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* All my Post */}
            <div>
              <h1>
                My Post -
                {' '}
                {profile?.posts?.length}
              </h1>
              {/* Loop here */}
              {profile?.posts?.length <= 0 ? (
                <h2>No Post Found</h2>
              ) : (
                profile?.posts?.map((post: T.Post) => (
                  <div key={post._id}>
                    <img
                      src={post?.image}
                      alt="poster"
                    />
                    <div>
                      <Link
                        to={`/post/${post?._id}`}
                      >
                        <h3>
                          {post?.title}
                        </h3>
                      </Link>
                      <p>
                        {post?.description}
                      </p>
                      <Link
                        to={`/posts/${post?._id}`}
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </article>
      </main>
    </SingleColumnLayout>
  );
}
