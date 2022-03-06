import React, {
  useState, useEffect, useMemo, FormEventHandler, ChangeEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState } from '^/store';
import { createCategoryAction } from '^/store/slices/category';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import InputWithLabel from '^/components/molecules/inputWithLabel';
import { Button } from '^/components/atoms/basicButton';
import Spinner from '^/components/atoms/spinner';
import {
  Container,
  StyledForm,
  Title,
  Text,
  ErrorWrapper,
} from './styles';

interface IObject {
  [key: string]: string
}
interface Form {
  newCategory: string
}

function AddCategoryPage(): JSX.Element {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<Form>({
    newCategory: '',
  });
  const [formErrors, setFormErrors] = useState<IObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    newCategory,
  } = formValues;

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  const {
    loading, error, isCreated,
  } = useSelector((state: RootState) => state.category);

  // form validation handler
  const validate = (values: Form) => {
    const errors: IObject = {};

    if (!values.newCategory) {
      errors.category = '카테고리를 입력해야 합니다';
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
      dispatch(createCategoryAction({ title: newCategory }));
    }
  }, [formErrors, dispatch, isSubmitting, newCategory]);

  const buttonContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return '추가';
  }, [loading]);

  const serverError = useMemo(() => {
    if (error && !Object.keys(formErrors).length && isSubmitting) {
      return error;
    }
    return null;
  }, [error, isSubmitting, formErrors]);

  if (isCreated) {
    return <Redirect to="/category-list" />;
  }

  return (
    <SingleColumnLayout>
      <Container>
        <Title>
          <Text>
            카테고리 더하기
          </Text>
        </Title>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <InputWithLabel
            id="category"
            label="카테고리"
            type="text"
            value={newCategory}
            placeholder="새로운 카테고리를 입력하세요"
            handleChange={handleChange}
            formErrors={formErrors}
            serverError={serverError}
          />
          {serverError && <ErrorWrapper>{serverError}</ErrorWrapper>}
          <Button type="submit">
            {buttonContent}
          </Button>
        </StyledForm>
      </Container>
    </SingleColumnLayout>
  );
}

export default AddCategoryPage;
