import styled from 'styled-components';
import ReactQuill from 'react-quill';

export const Container = styled.div`
  position: relative;
  width: 960px;
  display: flex;
  align-items: center;
  margin: 2rem auto;
;`;

export const StyledForm = styled.form`
  display: flex;
  width: 100%;
`;

export const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  .ql-editor {
    height: 100px;
    border: ${({ theme }) => `1px solid ${theme.palette.contrastText}`};
    border-radius: 4px;
    font-size: 16px;
  }

  .ql-tooltip {
    z-index: 99;
  }
`;

export const Text = styled.span`
  margin: 0.75rem;
`;

export const CommentEditor = styled(ReactQuill)`
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => `1px solid ${theme.palette.contrastText}`};
  transition: all 0.15s ease;
  resize: none;
`;

export const SubmitButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.25rem 0.75rem;
`;
