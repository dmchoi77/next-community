import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const TopButton: FunctionComponent = () => {
  return (
    <TopButtonWrapper onClick={() => window.scrollTo(0, 0)}>
      <Button src="/images/topicon.png" />
    </TopButtonWrapper>
  );
};

export default TopButton;

const TopButtonWrapper = styled.div`
  width: fit-content%;

  position: fixed;
  right: 0px;
  bottom: 63px;

  display: flex;
  justify-content: flex-end;
  margin: 16px;
`;

const Button = styled.img`
  padding: 10px;

  width: 30px;
  height: 30px;

  border-radius: 83%;
  border: 1px solid #02020287;
  background: #ffffff;

  cursor: pointer;
`;
