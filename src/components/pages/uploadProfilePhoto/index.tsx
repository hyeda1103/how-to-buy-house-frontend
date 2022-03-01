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
    loadingUploadProfilePhoto, errorUploadProfilePhoto, userAuth, isUpdated,
  } = useSelector((state: RootState) => state.auth);

  const buttonContent = useMemo(() => {
    if (loadingUploadProfilePhoto) {
      return <Spinner />;
    }
    return '업데이트';
  }, [loadingUploadProfilePhoto]);

  const errorUploadProfilePhotoMessage = useMemo(() => {
    if (errorUploadProfilePhoto) {
      return errorUploadProfilePhoto;
    }
    return null;
  }, [errorUploadProfilePhoto]);

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
        {errorUploadProfilePhotoMessage && errorUploadProfilePhotoMessage}
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
