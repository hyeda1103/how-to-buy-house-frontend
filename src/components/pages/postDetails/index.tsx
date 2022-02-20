import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SingleColumnLayout from '../../templates/singleColumnLayout';
import AddComment from '../../organisms/commentBox';
import { RootState } from '../../../store';
import { fetchPostDetailsAction, deletePostAction } from '../../../store/slices/post';
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
import CommentList from '../../organisms/commentList';

interface Props {
  match: {
    params: {
      id: string
    }
  }
  history: RouteComponentProps['history']
}

function PostDetailsPage({ match, history }: Props): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();
  const {
    postDetails, loading, error, isDeleted,
  } = useSelector((state: RootState) => state.post);
  if (isDeleted) history.push('/posts');

  const {
    userAuth,
  } = useSelector((state: RootState) => state.auth);
  const isCreatedBy = useMemo(() => postDetails?.user?._id === userAuth?._id, [postDetails, userAuth]);

  const { commentCreated, commentDeleted } = useSelector((state: RootState) => state.comment);
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, commentCreated, commentDeleted]);

  const handleDelete = () => dispatch(deletePostAction(postDetails?._id));
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
        <Description>{postDetails.description}</Description>
      </Container>
      )}
      <AddComment postId={id} disable={!!userAuth} />
      <CommentList comments={postDetails?.comments} />
    </SingleColumnLayout>
  );
}

export default PostDetailsPage;
