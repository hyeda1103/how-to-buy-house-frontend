import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SingleColumnLayout from '../../templates/singleColumnLayout';
import { RootState } from '../../../store';
import { fetchPostDetailsAction } from '../../../store/slices/posts';

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
  const isCreatedBy = postDetails?.user?.id === userAuth?.id;

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);
  return (
    <SingleColumnLayout>
      {postDetails && (
      <section>
        <h2>{postDetails.title}</h2>
        <p>{postDetails.description}</p>
      </section>
      )}
    </SingleColumnLayout>
  );
}

export default PostDetailsPage;
