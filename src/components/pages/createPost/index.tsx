import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';
import { DropEvent, FileRejection } from 'react-dropzone';

import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '^/store';
import { createPostAction } from '^/store/slices/post';
import FileZone from '^/components/atoms/fileZone';
import { Button } from '^/components/atoms/basicButton';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import Spinner from '^/components/atoms/spinner';
import Dropdown from '^/components/atoms/dropDown';
import { fetchCategoriesAction } from '^/store/slices/category';
import {
  Container,
  StyledLabel,
  StyledForm,
  Title,
  Text,
  StyledInput,
  StyledTextArea,
} from './styles';

interface Option {
  value: string
  label: string
}

interface Theme {
  theme: DefaultTheme
}

const customStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    background: `${({ theme }: Theme) => theme.palette.common.main}`,
    fontSize: '16px',
    borderColor: `${({ theme }: Theme) => theme.palette.common.contrastText}`,
    color: `${({ theme }: Theme) => theme.palette.common.contrastText}`,
    minHeight: '44px',
    height: '44px',
    boxShadow: state.isFocused ? '0' : '0',
  }),
  // 드롭다운 메뉴
  option: (provided) => ({
    ...provided,
    color: `${({ theme }: Theme) => theme.palette.common.contrastText}`,
    fontSize: '16px',
    padding: '12px 20px',
    overflow: 'hidden',
  }),

  singleValue: (provided) => ({
    ...provided,
    color: `${({ theme }: Theme) => theme.palette.common.contrastText}`,
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: '44px',
    padding: '0 18px',
  }),

  input: (provided) => ({
    ...provided,
    margin: '0px',
    color: `${({ theme }: Theme) => theme.palette.common.contrastText}`,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '44px',
  }),
};

interface Form {
  title: string
  category: string
  description: string
  image: Blob | undefined
}

interface Props {
  history: RouteComponentProps['history']
}

function CreatePostPage({ history }: Props) {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Form>({
    title: '',
    category: '',
    description: '',
    image: undefined,
  });
  const [options, setOptions] = useState<Array<Option>>();

  const {
    title, description, image,
  } = formValues;

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  const { isCreated, loading: loadingPost, error: errorPost } = useSelector((state: RootState) => state.post);
  if (isCreated) history.push('/posts');

  const { categoryList, loading: loadingCategoryList, error: errorCategoryList } = useSelector((state: RootState) => state.category);
  const placeholder = useMemo(() => {
    if (loadingCategoryList) {
      return '로딩 중...';
    }
    return '카테고리를 선택하세요';
  }, [loadingCategoryList]);

  useEffect(() => {
    const selectOptions = categoryList?.map((category) => ({
      value: category._id,
      label: category.title,
    }));
    setOptions(selectOptions);
  }, [categoryList]);

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const handleFileDrop
    : (acceptedFiles: Blob[], fileRejections: FileRejection[], event: DropEvent) => void | undefined = (acceptedFiles) => setFormValues({ ...formValues, image: acceptedFiles[0] });

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(createPostAction(formValues));
  };

  const buttonContent = useMemo(() => {
    if (loadingPost) {
      return <Spinner />;
    }
    return '포스트';
  }, [loadingPost]);

  const errorMessage = useMemo(() => {
    if (errorPost) {
      return errorPost;
    }
    return null;
  }, [errorPost]);

  // selector props
  const handleSelectChange = (e: any) => setFormValues({
    ...formValues,
    category: e.label,
  });

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            새로운 포스트
          </Text>
        </Title>
        {errorMessage && errorMessage}
        <StyledForm onSubmit={submitHandler}>
          <StyledLabel htmlFor="title">
            <Text>
              제목
            </Text>
            <StyledInput
              type="title"
              id="title"
              placeholder="포스트 제목을 입력하세요"
              value={title}
              autoComplete="off"
              onChange={handleChange('title')}
            />
          </StyledLabel>
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
            <StyledTextArea
              id="description"
              placeholder="포스트 본문을 입력하세요"
              value={description}
              autoComplete="off"
              onChange={handleChange('description')}
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
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default CreatePostPage;
