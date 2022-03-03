import styled from 'styled-components';

import { ReactComponent as Error } from '^/assets/icons/error.svg';

export const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & + & {
    margin-top: 50.71px;
  }
`;

export const Text = styled.span`
  font-size: 16px;
  line-height: 19.2px;
  font-weight: 500;
`;

interface StyleProps {
  error: boolean
}

export const StyledInput = styled.input<StyleProps>`
  width: 100%;
  height: 59px;
  padding: 0 8px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.palette.main};
  border: none;
  border-bottom: ${({ theme, error }) => (error
    ? `2px solid ${theme.palette.fail}`
    : `1px solid ${theme.palette.border.default}`)
};
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;

  &:focus {
    border-bottom: ${({ theme, error }) => (error
    ? `2px solid ${theme.palette.fail}`
    : `1px solid ${theme.palette.border.focus}`)
};
  }
`;

export const GuideWrapper = styled.div`
  width: 480px;
  text-align: right;
`;
