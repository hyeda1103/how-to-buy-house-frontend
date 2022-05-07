import styled from 'styled-components';

export const MessageWrapper = styled.div`
  height: calc(100vh - 176px * 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    margin-bottom: 36px;
  }

h1 {
    font-size: 28px;
    line-height: 1.0;
    margin-bottom: 20px;
  }

  p {
    font-size: 14px;
    color: #a1a1a1;
  }
`;
