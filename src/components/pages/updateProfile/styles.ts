import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
;`;

export const StyledForm = styled.form`
  width: 480px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 65px;
  letter-spacing: 1.6px;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Text = styled.span`
  margin: 0.75rem;
`;

export const ErrorWrapper = styled.p`
  margin: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.palette.fail};
`;

export const GuideWrapper = styled.div`
  width: 480px;
  text-align: right;
`;
