import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SingleColumnLayout from '../../templates/singleColumnLayout';
import { RootState } from '../../../store';
import { fetchPostDetailsAction, deletePostAction } from '../../../store/slices/posts';

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
  console.log(postDetails.user, userAuth);

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);
  return (
    <SingleColumnLayout>
      {postDetails && (
      <section>
        <h2>{postDetails.title}</h2>
        <p>{postDetails.description}</p>
          {isCreatedBy ? (
            <p>
              <Link to={`/update-post/${postDetails?.id}`}>
                편집
              </Link>
              <button
                type="button"
                /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
                /* eslint-disable jsx-a11y/click-events-have-key-events */
                onClick={() => dispatch(deletePostAction(postDetails?.id))}
              >
                삭제
              </button>
            </p>
          ) : null}
      </section>
      )}
    </SingleColumnLayout>
  );
}

export default PostDetailsPage;
