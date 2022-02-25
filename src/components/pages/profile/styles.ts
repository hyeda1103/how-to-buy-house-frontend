import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

export const MainProfile = styled.div`
  display: flex;
`;

export const ProfileImage = styled.img`
  margin-right: 1rem;
  border-radius: 1rem;
  overflow: hidden;
`;

interface StyleProps {
  isOneLine?: boolean
}

export const InfoLine = styled.div<StyleProps>`
  display: flex;
  flex-direction: ${({ isOneLine }) => (isOneLine ? 'row' : 'column')};
  align-items: ${({ isOneLine }) => (isOneLine ? 'center' : 'flex-start')};
  & + & {
    margin-top: 1rem;
  }
`;

export const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-right: 1rem;
`;

export const VerificationBadge = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.palette.common.contrastText};
`;

export const ListOfViewers = styled.ul`
`;

export const ViewerProfile = styled.li`
  float: left;
  & + & {
    margin-left: 0.5rem;
  }
`;

export const ViewProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

export const ViewerProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  border-radius: 4px;
  margin-right: 0.25rem;
`;

export const UploadButton = styled(Link)`
  font-size: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.palette.common.contrastText};

  & + & {
    margin-left: 0.5rem;
  }
`;

export const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;
