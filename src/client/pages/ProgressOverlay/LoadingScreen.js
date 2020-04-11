import React from 'react';

import { Loader, LoaderWrapper } from 'Components/Styles';

import { Wrapper } from './styled';

const LoadingScreen = () => {
  return (
    <Wrapper>
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    </Wrapper>
  );
};

export default LoadingScreen;
