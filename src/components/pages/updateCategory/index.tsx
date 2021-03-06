import React, {
  useState, useEffect, useMemo, ChangeEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  InputWrapper,
  StyledForm,
  Title,
} from './styles';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import InputWithLabel from '^/components/molecules/inputWithLabel';
import { Button } from '^/components/atoms/basicButton';
import Spinner from '^/components/atoms/spinner';
import { fetchCategoryAction, updateCategoriesAction } from '^/store/slices/category';
import { RootState } from '^/store';
import ErrorBox from '^/components/molecules/errorBox';
import AuthForm from '^/components/templates/authForm';

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
  newCategory: string
}

function UpdateCategoryPage({ match }: Props): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, [dispatch, id]);

  const {
    loading, error, category,
  } = useSelector((state: RootState) => state.category);

  const [formValues, setFormValues] = useState<Form>({
    newCategory: '',
  });
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormValues({
      newCategory: category?.title || '',
    });
  }, [category]);

  const {
    newCategory,
  } = formValues;

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: Form) => {
    const errors: IObject = {};

    if (!values.newCategory) {
      errors.newCategory = '카테고리를 입력해야 합니다';
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
      dispatch(updateCategoriesAction({ _id: id, title: newCategory }));
    }
  }, [formErrors, dispatch, id, isSubmitting, newCategory]);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '업데이트';
  }, [loading]);

  const serverError = useMemo(() => {
    if (error && !Object.keys(formErrors).length && isSubmitting) {
      return error;
    }
    return null;
  }, [error, isSubmitting, formErrors]);

  const title = (
    <Title>
      카테고리 업데이트
    </Title>
  );

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="newCategory"
          label="카테고리"
          type="text"
          value={newCategory}
          placeholder="새로운 카테고리를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
          serverError={serverError}
        />
        {serverError && <ErrorBox>{serverError}</ErrorBox>}
      </InputWrapper>
      <Button type="submit">
        {buttonContent}
      </Button>
    </StyledForm>
  );

  return (
    <SingleColumnLayout>
      <AuthForm
        title={title}
        form={form}
      />
    </SingleColumnLayout>
  );
}

export default UpdateCategoryPage;
