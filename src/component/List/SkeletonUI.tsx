import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const SkeletonUI: FunctionComponent = () => {
  return (
    <Wrapper>
      <img src="/images/skeletonUI.png" />
      <img src="/images/skeletonUI.png" />
      <img src="/images/skeletonUI.png" />
      <img src="/images/skeletonUI.png" />
    </Wrapper>
  );
};

export default SkeletonUI;

const Wrapper = styled.div`
  height: 100vh;
  margin: 0 26px;

  img {
    width: 100%;
  }
`;
