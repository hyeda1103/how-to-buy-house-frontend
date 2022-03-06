import React, {
  useState, useEffect, useMemo, ChangeEvent, FormEventHandler,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';
import { DropEvent, FileRejection } from 'react-dropzone';
import { Redirect } from 'react-router-dom';

import { RootState } from '^/store';
import { createPostAction } from '^/store/slices/post';
import FileZone from '^/components/atoms/fileZone';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import Spinner from '^/components/atoms/spinner';
import Dropdown from '^/components/atoms/dropDown';
import { fetchCategoriesAction } from '^/store/slices/category';
import TextEditor from '^/components/organisms/textEditor';
import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
  ErrorWrapper,
} from './styles';
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

interface IObject {
  [key: string]: string
}

interface Form {
  title: string
  category: string
  description: string
  image: Blob | undefined
}

function CreatePostPage() {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Form>({
    title: '',
    category: '',
    description: '',
    image: undefined,
  });
  // category options
  const [options, setOptions] = useState<Array<Option>>();
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    title, description, image,
  } = formValues;

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const { isCreated, loading: loadingPost, error: errorPost } = useSelector((state: RootState) => state.post);

  const { categoryList, loading: loadingCategoryList, error: errorCategoryList } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    const selectOptions = categoryList?.map((category) => ({
      value: category._id,
      label: category.title,
    }));
    setOptions(selectOptions);
  }, [categoryList]);

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const handleFileDrop
    : (acceptedFiles: Blob[], fileRejections: FileRejection[], event: DropEvent) => void | undefined = (acceptedFiles) => setFormValues({ ...formValues, image: acceptedFiles[0] });

  // form validation handler
  const validate = (values: Form) => {
    const errors: IObject = {};

    if (!values.title) {
      errors.title = '제목을 입력해야 합니다';
    }

    if (!values.category) {
      errors.category = '카테고리를 설정해야 합니다';
    }

    if (!values.description) {
      errors.description = '내용을 입력해야 합니다';
    }

    if (!values.image) {
      errors.image = '이미지를 설정해야 합니다';
    }

    return errors;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      console.log(description);
      dispatch(createPostAction(formValues));
    }
  }, [formErrors, isSubmitting, dispatch, description, formValues]);

  const buttonContent = useMemo(() => {
    if (loadingPost) {
      return <Spinner />;
    }
    return '포스트 등록';
  }, [loadingPost]);

  const serverError = useMemo(() => {
    if (errorPost && !Object.keys(formErrors).length && isSubmitting) {
      return errorPost;
    }
    return null;
  }, [errorPost, isSubmitting, formErrors]);

  // selector props
  const handleSelectChange = (e: any) => setFormValues({
    ...formValues,
    category: e.label,
  });

  if (isCreated) {
    return <Redirect to="/posts" />;
  }

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            새로운 포스트
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
            <TextEditor value={description} formValues={formValues} setFormValues={setFormValues} />
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

export default CreatePostPage;
