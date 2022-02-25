import styled, { css } from 'styled-components';
import { IoThumbsUp, IoThumbsDown, IoEye } from 'react-icons/io5';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr ;
  gap: 1rem;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const SubGrid = styled.div``;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: ${({ theme }) => `1px solid ${theme.palette.common.contrastText}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  object-fit: contain;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 12px 20px;
`;

export const StatsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

export const StatItem = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Icon = css`
  cursor: pointer;
`;

export const ThumbsUpIcon = styled(IoThumbsUp)`
  ${Icon}
`;

export const ThumbsDownIcon = styled(IoThumbsDown)`
  ${Icon}
`;

export const EyeIcon = styled(IoEye)``;

export const AuthorInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
  align-items: center;
  margin-bottom: .5rem;
`;

export const ProfilePhoto = styled.img`
  position: relative;
  object-fit: contain;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  overflow: hidden;
`;

export const PostDetails = styled.div`
  margin: 1rem 0;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const PostedDate = styled.time`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  margin-bottom: 1rem;
`;

export const CategoryWrapper = styled.div`
`;

export const CategoryList = styled.ul`
  list-style: none;
`;

export const CategoryItem = styled.li`
  cursor: pointer;
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.palette.common.contrastText};

  & + & {
    margin-top: 1rem;
  }
`;
