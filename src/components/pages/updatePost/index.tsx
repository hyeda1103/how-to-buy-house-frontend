import React, {
  useState, useEffect, useMemo, ChangeEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';
import { DropEvent, FileRejection } from 'react-dropzone';

import { Redirect } from 'react-router-dom';
import { RootState } from '^/store';
import { fetchPostDetailsAction, updatePostAction } from '^/store/slices/post';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import Spinner from '^/components/atoms/spinner';
import Dropdown from '^/components/atoms/dropDown';
import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
  ErrorWrapper,
} from './styles';
import { fetchCategoriesAction } from '^/store/slices/category';
import FileZone from '^/components/atoms/fileZone';
import TextEditor from '^/components/organisms/textEditor';
import InputWithLabel from '^/components/molecules/inputWithLabel';

interface Option {
  value: string | null
  label: string
}

interface Theme {
  theme: DefaultTheme
}

const customStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    background: `${({ theme }: Theme) => theme.palette.main}`,
    fontSize: '16px',
    borderColor: `${({ theme }: Theme) => theme.palette.contrastText}`,
    color: `${({ theme }: Theme) => theme.palette.contrastText}`,
    minHeight: '44px',
    height: '44px',
    boxShadow: state.isFocused ? '0' : '0',
  }),
  // 드롭다운 메뉴
  option: (provided) => ({
    ...provided,
    color: `${({ theme }: Theme) => theme.palette.contrastText}`,
    fontSize: '16px',
    padding: '12px 20px',
    overflow: 'hidden',
  }),

  singleValue: (provided) => ({
    ...provided,
    color: `${({ theme }: Theme) => theme.palette.contrastText}`,
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: '44px',
    padding: '0 18px',
  }),

  input: (provided) => ({
    ...provided,
    margin: '0px',
    color: `${({ theme }: Theme) => theme.palette.contrastText}`,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '44px',
  }),
};
interface Props {
  match: {
    params: {
      id: string
    }
  }
}

interface IObject {
  [key: string]: string
}

interface Form {
  title: string
  description: string
}

function UpdatePostPage({ match }: Props) {
  const { id } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [dispatch, id]);

  const {
    postDetails, loading, error, isUpdated,
  } = useSelector((state: RootState) => state.post);

  const [formValues, setFormValues] = useState<Form>({
    title: '',
    description: '',
  });
  const [category, setCategory] = useState();
  const [image, setImage] = useState<Blob | undefined>();
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    title, description,
  } = formValues;

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const { categoryList, loading: loadingCategoryList, error: errorCategoryList } = useSelector((state: RootState) => state.category);
  const [options, setOptions] = useState<Array<Option>>();

  useEffect(() => {
    const selectOptions = categoryList?.map((categoryItem) => ({
      value: categoryItem._id,
      label: categoryItem.title,
    }));
    setOptions(selectOptions);
  }, [categoryList]);

  useEffect(() => {
    setFormValues({
      title: postDetails?.title || '',
      description: postDetails?.description || '',
    });
  }, [postDetails]);

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const handleFileDrop
    : (acceptedFiles: Blob[], fileRejections: FileRejection[], event: DropEvent) => void | undefined = (acceptedFiles) => setImage(acceptedFiles[0]);

  // form validation handler
  const validate = (values: Form) => {
    const errors: IObject = {};

    if (!values.title) {
      errors.title = '제목을 입력해야 합니다';
    }

    if (!values.description) {
      errors.description = '내용을 입력해야 합니다';
    }

    return errors;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      const data = {
        ...formValues,
        _id: id,
        category: category || postDetails?.category,
        image: image || postDetails?.image,
      };
      dispatch(updatePostAction(data));
    }
  }, [formErrors, isSubmitting, dispatch, category, formValues, id, image, postDetails?.category, postDetails?.image]);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '포스트 업데이트';
  }, [loading]);

  const serverError = useMemo(() => {
    if (error && !Object.keys(formErrors).length && isSubmitting) {
      return error;
    }
    return null;
  }, [error, formErrors, isSubmitting]);

  // selector props
  const handleSelectChange = (e: any) => setCategory(e.label);

  if (isUpdated) {
    return <Redirect to="/posts" />;
  }

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            포스트 업데이트
          </Text>
        </Title>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <InputWithLabel
            id="title"
            label="제목"
            type="text"
            value={title}
            placeholder="제목을 입력하세요"
            handleChange={handleChange}
            formErrors={formErrors}
            serverError={serverError}
          />
          <StyledLabel htmlFor="category">
            <Text>
              카테고리
            </Text>
            {options && (
              <Dropdown
                options={options}
                handleChange={handleSelectChange}
                placeholder="카테고리를 선택하세요"
                customStyles={customStyles}
              />
            )}
          </StyledLabel>
          <StyledLabel htmlFor="description">
            <Text>
              본문
            </Text>
            <TextEditor
              value={description}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </StyledLabel>
          <StyledLabel htmlFor="image">
            <Text>
              이미지
            </Text>
            <FileZone
              acceptableExtensions="image/jpeg, image/png"
              handleFileDrop={handleFileDrop}
              attachedFileName={(image as File)?.name}
            />
          </StyledLabel>
          {serverError && <ErrorWrapper>{serverError}</ErrorWrapper>}
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default UpdatePostPage;
