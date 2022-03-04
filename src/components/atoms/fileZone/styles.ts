import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  border: 1px dashed ${({ theme }) => theme.palette.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.palette.main};
  transition: border 0.24s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.border.default};
  }
`;
