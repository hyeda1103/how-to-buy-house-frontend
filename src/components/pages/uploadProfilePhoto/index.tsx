import React, {
  useState, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropEvent, FileRejection } from 'react-dropzone';

import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../store';
import { createPostAction } from '../../../store/slices/post';
import { Button } from '../../atoms/basicButton';
import SingleColumnLayout from '../../templates/singleColumnLayout';
import Spinner from '../../atoms/spinner';
import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
} from './styles';
import { fetchCategoriesAction } from '../../../store/slices/category';
import { uploadProfilePhototAction } from '../../../store/slices/user';
import FileZone from '../../atoms/fileZone';

interface Option {
  value: string
  label: string
}

interface Form {
  image: Blob | undefined
}

interface Props {
  history: RouteComponentProps['history']
}

function UploadProfilePhotoPage({ history }: Props) {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Form>({
    image: undefined,
  });

  const {
    image,
  } = formValues;

  const handleFileDrop
    : (acceptedFiles: Blob[], fileRejections: FileRejection[], event: DropEvent) => void | undefined = (acceptedFiles) => setFormValues({ ...formValues, image: acceptedFiles[0] });

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(uploadProfilePhototAction(formValues));
  };

  const {
    profilePhoto, loading, error, userAuth, isUpdated,
  } = useSelector((state: RootState) => state.auth);

  // redirect
  if (isUpdated) history.push(`/profile/${userAuth?._id}`);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '업데이트';
  }, [loading]);

  const errorMessage = useMemo(() => {
    if (error) {
      return error;
    }
    return null;
  }, [error]);

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            프로필 사진 업데이트
          </Text>
        </Title>
        {errorMessage && errorMessage}
        <StyledForm onSubmit={submitHandler}>
          <StyledLabel htmlFor="image">
            <Text>
              프로필 사진
            </Text>
            <FileZone
              acceptableExtensions="image/jpeg, image/png"
              handleFileDrop={handleFileDrop}
              attachedFileName={(image as File)?.name}
            />
          </StyledLabel>
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default UploadProfilePhotoPage;
