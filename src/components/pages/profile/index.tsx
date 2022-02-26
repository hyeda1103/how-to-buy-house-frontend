import React, { useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  userProfileAction,
  followUserAction,
  unfollowUserAction,
} from '^/store/slices/user';
import { RootState } from '^/store';
import { accountVerificationSendTokenAction } from '^/store/slices/accountVerification';
import DateFormatter from '^/utils/dateFormatter';
import * as T from '^/types';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import PostCard from '^/components/organisms/postCard';
import {
  Container,
  InfoLine,
  ListOfViewers,
  MainProfile,
  Name,
  ProfileImage,
  UploadButton,
  VerificationBadge,
  ViewerProfile,
  ViewerProfileImage,
  ViewProfileWrapper,
  PostGrid,
} from './styles';
import Spinner from '^/components/atoms/spinner';

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

  const { loading, isVerified } = useSelector((state: RootState) => state.accountVerification);

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

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return 'Unverified Account';
  }, [loading]);

  // isLogin

  const isLoginUser = userAuth?._id === profile?._id;

  return (
    <SingleColumnLayout>
      {/* Static sidebar for desktop */}
      <Container>
        {/* Profile header */}
        <MainProfile>
          <ProfileImage
            src={profile?.profilePhoto}
            alt={profile?.firstName}
          />
          <div>
            <InfoLine isOneLine>
              <Name>{profile?.name}</Name>
              {profile?.isAccountVerified ? (
                <VerificationBadge>
                  Account Verified
                </VerificationBadge>
              ) : (
                <VerificationBadge onClick={() => dispatch(accountVerificationSendTokenAction())}>
                  {buttonContent}
                </VerificationBadge>
              )}
              <button
                type="button"
                onClick={sendMailNavigate}
              >
                Send Message
              </button>
            </InfoLine>
            <InfoLine isOneLine>
              <p>
                가입 날짜:
                {' '}
                <DateFormatter date={profile?.createdAt} />
                {' '}
              </p>
            </InfoLine>
            <InfoLine isOneLine>
              <p>
                포스트:
                {' '}
                {profile?.posts?.length}
                {' '}
                팔로워:
                {' '}
                {profile?.followers?.length}
                {' '}
                팔로잉:
                {' '}
                {profile?.following?.length}
              </p>
            </InfoLine>
            <InfoLine>
              <p>
                나의 프로필을 조회한 사람들:
                {' '}
                {profile?.viewedBy?.length}
              </p>
              {/* Who view my post */}
              <ListOfViewers>
                {profile?.viewedBy?.length ? (
                  profile?.viewedBy?.map((user: T.User) => (
                    <ViewerProfile key={user._id}>
                      <ViewProfileWrapper>
                        <ViewerProfileImage
                          src={user?.profilePhoto}
                          alt={user?.name}
                        />
                        <p>
                          {user?.name}
                        </p>
                      </ViewProfileWrapper>
                    </ViewerProfile>
                  ))
                ) : (
                  <h1>No Viewer</h1>
                )}
              </ListOfViewers>
            </InfoLine>
            <InfoLine>
              {isLoginUser && (
                <div>
                  <UploadButton
                    to="/upload-profile-photo"
                  >
                    <span>Upload Photo</span>
                  </UploadButton>
                  <UploadButton
                    to={`/update-profile/${profile?._id}`}
                  >
                    <span>Update Profile</span>
                  </UploadButton>
                </div>
              )}
            </InfoLine>
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
          </div>
        </MainProfile>
        {/* Tabs */}
        <div>
          {/* All my Post */}
          <div>
            <h3>
              {' '}
              {profile?.posts?.length}
              개의 포스트 작성
            </h3>
            {/* Loop here */}
            {profile?.posts?.length <= 0 ? (
              <h2>No Post Found</h2>
            ) : (
              <PostGrid>
                {profile?.posts?.map((post: T.Post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </PostGrid>
            )}
          </div>
        </div>
      </Container>
    </SingleColumnLayout>
  );
}
