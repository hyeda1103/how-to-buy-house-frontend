import styled, { css } from 'styled-components';
import Moment from 'react-moment';
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

export const NumOfComments = styled.p`
    margin: 0.75rem;
`;

export const CommentWrapper = styled.li`
  display: flex;
  flex-direction: column;
  margin: 1.25rem 0;
`;

export const MentionWrapper = styled.div`
  display: flex;  
  width: 100%;
  align-items: center;
`;

const Icon = css`
  font-size: 1rem;
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

export const AuthorInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .75rem;
  margin-right: 1.25rem;
`;

export const ProfilePhoto = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  overflow: hidden;
  border-radius: 50%;
`;

export const AuthorName = styled.p`
  font-size: 1rem;
`;

export const Description = styled.p`
  font-size: 1rem;
`;

export const ReactMoment = styled(Moment)`
  display: flex;
  font-size: 0.85rem;
  margin-left: auto;
`;
