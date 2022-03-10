import React from 'react';
import { useSelector } from 'react-redux';

import * as T from '^/types';
import { RootState } from '^/store';
import {
  Container,
  NumOfComments,
} from './styles';
import CommentItem from '^/components/molecules/commentItem';

interface Props {
  comments: Array<T.Comment>
}

function CommentList({ comments }: Props): JSX.Element {
  const displayComments = (allComments: Array<T.Comment>) => {
    let commentList: JSX.Element[] = [];
    allComments?.forEach((comment) => {
      commentList.push(
        <CommentItem
          key={comment?._id}
          comment={comment}
        />,
      );
      if (comment?.children && comment?.children?.length > 0) {
        const replies = displayComments(comment?.children);
        commentList = commentList.concat(replies);
      }
    });
    return commentList;
  };

  return (
    <Container>
      <ul>
        <NumOfComments>
          {comments?.length}
          {' '}
          개의 댓글
        </NumOfComments>
        {displayComments(comments)}
      </ul>
    </Container>
  );
}

export default CommentList;
