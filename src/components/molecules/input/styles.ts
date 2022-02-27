import styled from 'styled-components';

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

interface StyleProps {
  error: boolean
}

export const StyledInput = styled.input<StyleProps>`
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.common.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-color: ${({ theme, error }) => (error
    ? theme.palette.fail.contrastText
    : theme.palette.common.contrastText)
};
  border-width: ${({ theme, error }) => (error
    ? '2px'
    : '1px')
};
  border-style: solid;
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
`;

export const ErrorWrapper = styled.p`
  margin: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.palette.fail.contrastText};
`;

export const GuideWrapper = styled.div`
  width: 480px;
  text-align: right;
`;
