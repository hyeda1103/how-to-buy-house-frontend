import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

import { createCommentAction } from '../../../store/slices/comment';
import * as T from '../../../types';
import {
  Container,
  StyledLabel,
  StyledForm,
  Text,
  StyledInput,
  SubmitButton,
} from './styles';
import Spinner from '../../atoms/spinner';

interface Props {
  postId: T.Post['_id']
  disable: boolean
}

function AddComment({ postId, disable }: Props) {
  const dispatch = useDispatch();
  // select data from store
  const { loading, error } = useSelector((state: RootState) => state.comment);
  const [formValues, setFormValues] = useState({
    description: '',
  });

  const { description } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = {
      postId,
      description: formValues.description,
    };
    dispatch(createCommentAction(data));
  };

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '작성하기';
  }, [loading]);

  return (
    <Container>
      <StyledForm onSubmit={submitHandler}>
        <StyledLabel htmlFor="description">
          <Text>
            새로운 댓글 작성하기
          </Text>
          <StyledInput
            id="description"
            placeholder="댓글"
            value={description}
            autoComplete="off"
            onChange={handleChange('description')}
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
