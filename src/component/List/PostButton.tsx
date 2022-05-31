import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const PostButton: FunctionComponent = () => {
  const router = useRouter();
  const handleButtonClick = (e) => {
    e.preventDefault();
    router.push('/community/post/new');
  };
  return (
    <PostButtonWrapper onClick={handleButtonClick}>
      <Button alt="post-button" src="/images/post.png" />
    </PostButtonWrapper>
  );
};

export default PostButton;

const PostButtonWrapper = styled.div`
  width: 100%;

  position: fixed;
  right: 0px;
  bottom: 0px;

  display: flex;
  justify-content: flex-end;
  margin: 16px;
`;

const Button = styled.img`
  padding: 10px;

  width: 30px;
  height: 30px;
  background: #7c27eb;
  border-radius: 83%;
  border: transparent;
  color: #ffff;

  cursor: pointer;
`;
