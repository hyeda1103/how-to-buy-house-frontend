import React from 'react';

import { ToggleContainer, SunIcon, MoonIcon } from './styles';

interface IProps {
  themeToggler: () => void;
}

function Toggle({ themeToggler }: IProps) {
  return (
    <ToggleContainer onClick={themeToggler}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
}

export default React.memo(Toggle);
