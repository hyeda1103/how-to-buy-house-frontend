import styled from 'styled-components';

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
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Text = styled.span`
  margin: 0.75rem;
`;

export const StyledInput = styled.textarea`
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.common.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => `1px solid ${theme.palette.common.contrastText}`};
  transition: all 0.15s ease;
  resize: none;
`;

export const SubmitButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.25rem 0.75rem;
`;
