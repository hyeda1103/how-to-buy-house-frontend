import React from 'react';

import { MessageWrapper } from './styles';
import { ReactComponent as SadFaceIcon } from '^/assets/icons/sadFace.svg';

function NoResult() {
  return (
    <MessageWrapper>
      <SadFaceIcon />
      <h1>검색 결과가 없습니다</h1>
      <p>다른 검색어를 입력해보세요</p>
    </MessageWrapper>
  );
}

export default NoResult;
