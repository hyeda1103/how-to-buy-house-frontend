import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 38.4px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 50.71px;
`;

export const ErrorWrapper = styled.p`
  margin: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.palette.fail};
`;

export const GuideWrapper = styled.div`
  width: 100%;
`;
