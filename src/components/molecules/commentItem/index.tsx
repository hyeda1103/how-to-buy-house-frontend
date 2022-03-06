import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dompurify from 'dompurify';

import * as T from '^/types';
import { RootState } from '^/store';
import { deleteCommentAction } from '^/store/slices/comment';
import CommentBox from '^/components/organisms/commentBox';
import {
  EditWrapper,
  EditIcon,
  DeleteIcon,
  CommentWrapper,
  MentionWrapper,
  AuthorInfo,
  AuthorName,
  ProfilePhoto,
  Description,
  ReactMoment,
  ButtonWrapper,
  ReplyIcon,
  CancelIcon,
} from './styles';

interface Props {
  comment: T.Comment
}

function CommentItem({
  comment,
}: Props): JSX.Element {
  const [isReplying, setIsReplying] = useState(false);

  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: RootState) => state.auth);

  const loginUser = userAuth?._id;
  const indent = comment?.depth ? (comment.depth - 1) * 50 : 0;

  return (
    <CommentWrapper indent={indent}>
      {/* Check if is the same user created this comment */}
      {loginUser === comment?.user?._id ? (
        <EditWrapper>
          <Link to={`/update-comment/${comment?._id}`}>
            <EditIcon />
          </Link>
          <DeleteIcon onClick={() => dispatch(deleteCommentAction(comment?._id))} />
        </EditWrapper>
      ) : null}
      <MentionWrapper>
        <AuthorInfo>
          <ProfilePhoto src={comment?.user?.profilePhoto} alt={comment?.user.name} />
          <Link to={`/profile/${comment?.user?._id}`}>
            <AuthorName>
              {comment?.user?.name}
            </AuthorName>
          </Link>
        </AuthorInfo>
        <Description dangerouslySetInnerHTML={{
          __html: Dompurify.sanitize(comment?.description),
        }}
        />
        <ReactMoment fromNow ago>
          {comment?.createdAt}
        </ReactMoment>
      </MentionWrapper>
      <ButtonWrapper>
        <button
          type="button"
          disabled={comment?.depth > 3 || !loginUser}
          onClick={() => setIsReplying(!isReplying)}
        >
          {isReplying ? '취소' : '리플'}
        </button>
      </ButtonWrapper>
      {isReplying && (
        <CommentBox
          postId={comment?.post}
          parentComment={comment}
        />
      )}
    </CommentWrapper>
  );
}

export default CommentItem;
