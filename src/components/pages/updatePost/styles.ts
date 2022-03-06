import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
;`;

export const StyledForm = styled.form`
  width: 960px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 65px;
  letter-spacing: 1.6px;
  text-align: center;
  margin-bottom: 2rem;
`;

export const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
`;

export const Text = styled.span`
  margin: 0.75rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => `1px solid ${theme.palette.contrastText}`};
  transition: all 0.15s ease;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => `1px solid ${theme.palette.contrastText}`};
  transition: all 0.15s ease;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const ErrorWrapper = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.palette.fail};
`;

export const GuideWrapper = styled.div`
  width: 480px;
  text-align: right;
`;
