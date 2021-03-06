import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  object-fit: contain;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 17px 0;
`;

export const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface StyleProps {
  disabled?: boolean
  isLiked?: boolean
}

export const StatItem = styled.div<StyleProps>`
  display: flex;
  margin-right: 5px;
  align-items: center;
  gap: 1px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:last-child {
    margin-right: 0;
  }

  svg {
    fill: ${({ theme, isLiked }) => (isLiked ? theme.palette.primary : theme.palette.contrastText)}
  }

  p {
    font-size: 11px;
    font-weight: 700;
  }
`;

export const Title = styled.h3`
  font-size: 14px;
  width: 115px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  /* 말줄임 적용 */
`;
