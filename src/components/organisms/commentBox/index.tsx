import React, { useState, useMemo, useRef } from 'react';
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
  disable: boolean
}

function AddComment({ postId, disable }: Props) {
  const dispatch = useDispatch();
  const QuillRef = useRef<ReactQuill>();

  // select data from store
  const { loading, error } = useSelector((state: RootState) => state.comment);
  const [formValues, setFormValues] = useState({
    description: '',
  });

  const { description } = formValues;

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = {
      postId,
      description: formValues.description,
    };
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
      <StyledForm onSubmit={submitHandler} noValidate>
        <StyledLabel htmlFor="description">
          <Text>
            새로운 댓글 작성하기
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
        <SubmitButton type="submit">
          {buttonContent}
        </SubmitButton>
      </StyledForm>
    </Container>
  );
}

export default AddComment;
