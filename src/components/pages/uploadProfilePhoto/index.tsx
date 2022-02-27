import React, {
  useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropEvent, FileRejection } from 'react-dropzone';

import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RootState } from '^/store';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import Spinner from '^/components/atoms/spinner';
import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
} from './styles';
import { uploadProfilePhototAction } from '^/store/slices/user';
import FileZone from '^/components/atoms/fileZone';

interface Form {
  image: Blob | undefined
}

function UploadProfilePhotoPage() {
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

  // redirect
  if (isUpdated) {
    return <Redirect to={`/profile/${userAuth?._id}`} />;
  }

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
