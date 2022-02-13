import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  border: 1px dashed ${({ theme }) => theme.palette.common.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.palette.common.main};
  transition: border 0.24s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.success.main};
  }
`;
