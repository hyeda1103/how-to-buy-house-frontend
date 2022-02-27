import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
;`;

export const StyledForm = styled.form`
  width: 100%;
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
    ? '3px'
    : '1px')
};
  transition: all 0.15s ease;
`;

export const ErrorWrapper = styled.p`
  margin: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.palette.fail.contrastText};
`;

export const GuideWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
