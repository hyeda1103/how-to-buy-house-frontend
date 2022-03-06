import React, {
  useState, useMemo, useRef, FormEventHandler,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { RootState } from '^/store';
import { createCommentAction } from '^/store/slices/comment';
import * as T from '^/types';
import {
  Container,
  StyledLabel,
  StyledForm,
  Text,
  SubmitButton,
} from './styles';
import Spinner from '^/components/atoms/spinner';

interface Props {
  postId: T.Post['_id']
  parentComment: T.Comment | null
}

function AddComment({ postId, parentComment }: Props) {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: RootState) => state.auth);

  const loginUser = userAuth?._id;
  const QuillRef = useRef<ReactQuill>();

  // select data from store
  const { loading, error } = useSelector((state: RootState) => state.comment);
  const [formValues, setFormValues] = useState({
    description: '',
  });

  const { description } = formValues;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data: T.CommentCreate = {
      postId,
      description,
      parentId: parentComment?._id ? parentComment._id : null,
      depth: parentComment?.depth ? parentComment.depth + 1 : 1,
    };
    console.log(data);

    dispatch(createCommentAction(data));
    setFormValues({
      ...formValues,
      description: '',
    });
  };

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '작성하기';
  }, [loading]);

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <StyledLabel htmlFor="description">
          <Text>
            {parentComment?._id ? '대댓글 작성하기' : '새로운 댓글 작성하기'}
          </Text>
          <ReactQuill
            ref={(element) => {
              if (element !== null) {
                QuillRef.current = element;
              }
            }}
            value={description}
            onChange={(content, delta, source, editor) => setFormValues({
              ...formValues,
              description: editor.getHTML(),
            })}
            theme="bubble"
            placeholder="댓글을 입력해주세요."
          />
        </StyledLabel>
        <SubmitButton
          type="submit"
          disabled={!loginUser}
        >
          {buttonContent}
        </SubmitButton>
      </StyledForm>
    </Container>
  );
}

export default AddComment;
