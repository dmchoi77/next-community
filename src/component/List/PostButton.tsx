import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const PostButton = () => {
  const router = useRouter();
  const handleButtonClick = (e) => {
    e.preventDefault();
    router.push('/community/post/new');
  }
  return (
    <ButtonWrapper onClick={handleButtonClick}>
      <WriteButton>글쓰기</WriteButton>
    </ButtonWrapper>
  )
}

export default PostButton;

const ButtonWrapper = styled.div`
  width: 100%;

  position: fixed;
  right: 0px;
  bottom: 0px;

  display: flex;
  justify-content: flex-end;
  margin: 16px;
`

const WriteButton = styled.button`
  padding: 14px 16px;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  width: fit-content;
  height: 52px;
  background: #2C7FFF;
  border-radius: 8px;
  border: transparent;
  color: #ffff;

  cursor: pointer;
`