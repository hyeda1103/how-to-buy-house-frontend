import styled, { css } from 'styled-components';
import { IoPencilSharp, IoTrash } from 'react-icons/io5';

export const Container = styled.div`
  position: relative;
  width: 960px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const EditWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const Icon = css`
  font-size: 1.5rem;
  cursor: pointer;
    margin-left: 0.5rem;

  & + & {
  }
`;

export const DeleteIcon = styled(IoTrash)`
  ${Icon}
`;

export const EditIcon = styled(IoPencilSharp)`
  ${Icon}
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 65px;
  letter-spacing: 1.6px;
  margin-bottom: 2rem;
`;

export const AuthorInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  gap: .75rem;

  div {
    display: flex;
    flex-direction: column;
    gap: .25rem;
  }
`;

export const ProfilePhoto = styled.img`
  width: 3.25rem;
  height: 3.25rem;
  overflow: hidden;
  border-radius: 50%;
`;

export const AuthorName = styled.p`
  font-size: 1.125rem;
`;

export const AuthorEmail = styled.p`
  font-size: 1rem;
`;

export const Description = styled.div`
  margin-bottom: 2rem;
`;

export const ErrorWrapper = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.palette.fail};
`;

export const GuideWrapper = styled.div`
  width: 480px;
  text-align: right;
`;
