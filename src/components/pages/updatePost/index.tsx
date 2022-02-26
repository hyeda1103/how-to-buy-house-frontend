import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';
import { DropEvent, FileRejection } from 'react-dropzone';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { RouteComponentProps } from 'react-router-dom';
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
  StyledInput,
  StyledTextArea,
} from './styles';
import { fetchCategoriesAction } from '../../../store/slices/category';
import FileZone from '../../atoms/fileZone';

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
interface Props {
  history: RouteComponentProps['history']
  match: {
    params: {
      id: string
    }
  }
}

function UpdatePostPage({ history, match }: Props) {
  const { id } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [dispatch, id]);

  const {
    postDetails, loading, error, isUpdated,
  } = useSelector((state: RootState) => state.post);
  if (isUpdated) history.push('/posts');

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
  });
  const [category, setCategory] = useState();
  const [image, setImage] = useState<Blob | undefined>();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [options, setOptions] = useState<Array<Option>>();
  const { categoryList, loading: loadingCategoryList, error: errorCategoryList } = useSelector((state: RootState) => state.category);

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

  const {
    title, description,
  } = formValues;

  useEffect(() => {
    /** Convert html string to draft JS */
    const contentBlock = htmlToDraft(description);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const newEditorState = EditorState.createWithContent(contentState);

    setEditorState(newEditorState);
  }, [description]);

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const handleFileDrop
    : (acceptedFiles: Blob[], fileRejections: FileRejection[], event: DropEvent) => void | undefined = (acceptedFiles) => setImage(acceptedFiles[0]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = {
      ...formValues,
      _id: id,
      category: category || postDetails?.category,
      image: image || postDetails?.image,
    };
    dispatch(updatePostAction(data));
  };

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

  // selector props
  const handleSelectChange = (e: any) => setCategory(e.label);

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            포스트 업데이트
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
            <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorClassName="card-body"
              onEditorStateChange={(newState) => {
                setEditorState(newState);
                setFormValues({ ...formValues, description: draftToHtml(convertToRaw(newState.getCurrentContent())) });
              }}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'embedded', 'emoji', 'image'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
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

export default UpdatePostPage;
