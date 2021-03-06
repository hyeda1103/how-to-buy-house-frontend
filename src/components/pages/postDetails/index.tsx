import React, { useEffect, useMemo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dompurify from 'dompurify';

import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import CommentList from '^/components/organisms/commentList';
import AddComment from '^/components/organisms/commentBox';
import { RootState } from '^/store';
import { fetchPostDetailsAction, deletePostAction } from '^/store/slices/post';
import {
  Container,
  EditWrapper,
  EditIcon,
  DeleteIcon,
  Title,
  AuthorInfo,
  AuthorName,
  AuthorEmail,
  ProfilePhoto,
  Description,
} from './styles';

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

function PostDetailsPage({ match }: Props): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();
  const {
    postDetails, loading, error, isDeleted,
  } = useSelector((state: RootState) => state.post);

  const {
    userAuth,
  } = useSelector((state: RootState) => state.auth);
  const isCreatedBy = useMemo(() => postDetails?.user?._id === userAuth?._id, [postDetails, userAuth]);

  const { commentCreated, commentDeleted } = useSelector((state: RootState) => state.comment);
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, commentCreated, commentDeleted]);

  const handleDelete = () => dispatch(deletePostAction(postDetails?._id));

  if (isDeleted) {
    return <Redirect to="/posts" />;
  }
  return (
    <SingleColumnLayout>
      {postDetails && (
      <Container>
        {isCreatedBy ? (
          <EditWrapper>
            <Link to={`/update-post/${postDetails?._id}`}>
              <EditIcon />
            </Link>
            <DeleteIcon onClick={handleDelete} />
          </EditWrapper>
        ) : null}
        <Title>{postDetails.title}</Title>
        <AuthorInfo>
          <ProfilePhoto src={postDetails.user?.profilePhoto} alt={postDetails.user?.name} />
          <div>
            <AuthorName>
              {postDetails.user?.name}
            </AuthorName>
            <AuthorEmail>
              {postDetails.user?.email}
            </AuthorEmail>
          </div>
        </AuthorInfo>
        <Description dangerouslySetInnerHTML={{
          __html: Dompurify.sanitize(postDetails.description),
        }}
        />
      </Container>
      )}
      <AddComment postId={id} parentComment={null} />
      <CommentList comments={postDetails?.comments} />
    </SingleColumnLayout>
  );
}

export default PostDetailsPage;
