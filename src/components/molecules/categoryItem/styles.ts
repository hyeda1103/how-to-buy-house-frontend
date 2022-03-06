import styled from 'styled-components';

export const Container = styled.li`
  cursor: pointer;
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.palette.contrastText};

  & + & {
    margin-top: 1rem;
  }
`;
