import styled from 'styled-components';
import { ReactComponent as ArrowForwardIcon } from '^/assets/icons/arrowForward.svg';

export const Container = styled.div`
  position: relative;
  width: 364px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 43px 0;
;`;

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

export const FindPasswordWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 23px 0 75px;

  span {
    color: ${({ theme }) => theme.palette.hint};
    vertical-align: middle;
    display: inline-block;
  }

  svg {
    fill: ${({ theme }) => theme.palette.hint};
    vertical-align: middle;
    display: inline-block;
  }
`;

export const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: 7px;
  width: 8px;
  height: 14px;
`;

export const DirectTo = styled.div`
  background-color: ${({ theme }) => theme.palette.guide.background};
  text-align: center;

  a {
    margin-left: 5px;
    font-weight: 700;
    text-decoration: underline;
  }
`;
