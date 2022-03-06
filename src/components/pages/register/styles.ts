import styled from 'styled-components';
import { ReactComponent as ArrowForwardIcon } from '^/assets/icons/arrowForward.svg';

export const StyledForm = styled.form`
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 38.4px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 50.71px;
`;

export const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: 7px;
  width: 8px;
  height: 14px;
`;

export const DirectToWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.guide.background};
  text-align: center;
  padding: 7px auto;

  a {
    margin-left: 5px;
    font-weight: 700;
    text-decoration: underline;
  }
`;
