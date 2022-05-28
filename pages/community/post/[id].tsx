// 포스팅 상세 페이지 PostDetail
// UPDATE: 2022-05-28

import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import axios from 'axios';
import PostInfo from '../../../src/component/List/PostInfo';
import UserActivity from '../../../src/component/List/UserActivity';

const Post = ({ post }) => {
  const router = useRouter();
  return (
    <>
      <HeaderWrapper>
        <HeaderButton onClick={() => { router.push("/") }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.04375 8.04563L6.99055 12.3773C7.32879 12.7485 7.32879 13.3504 6.99055 13.7216C6.65231 14.0928 6.10391 14.0928 5.76566 13.7216L0.253682 7.67216C-0.0845606 7.30094 -0.0845606 6.69906 0.253682 6.32784L5.76566 0.278417C6.10391 -0.0928057 6.65231 -0.0928057 6.99055 0.278417C7.32879 0.64964 7.32879 1.25151 6.99055 1.62273L3.04375 5.95437H13.0473C13.5734 5.95437 14 6.42251 14 7C14 7.57749 13.5734 8.04563 13.0473 8.04563H3.04375Z" fill="#222222" />
          </svg>
        </HeaderButton>
        <strong>
          글 목록으로
        </strong>
      </HeaderWrapper>
      <PostDetailWrapper>
        <PostInfo writerProfileUrl={post.writerProfileUrl} writerNickName={post.writerNickName} categoryName={post.categoryName} writtenAt={post.writtenAt} />
        <PostContentWrapper>
          {post.content}

        </PostContentWrapper>
        {
          (post.imageUrl !== null && typeof post.imageUrl === 'object') ?
            post.imageUrl.map((image, index) => {
              return <PostContentImage src={image} key={index} />
            })
            : typeof post.imageUrl === 'string' ?
              <PostContentImage src={post.imageUrl} /> : null
        }
        <UserActivity viewCount={post.viewCount} likeCount={post.likeCount} commentCount={post.commentCount} />

      </PostDetailWrapper>
    </>
  )
}

export default Post;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const url = `http://localhost:4000/posts/${id}`;
  const res = await axios.get(url);
  const data = res.data;

  return {
    props: {
      post: data,
    }
  }
}

const HeaderWrapper = styled.div`
  height: 56px; 
  display: flex;
  align-items: center;
`
const HeaderButton = styled.button`
  margin: 21px 12px 21px 21px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`
// const HeaderContent = styled.div`
//   font-weight: 700;
//   font-size: 14px;
//   line-height: 14px;

//   color: #B4B4B4;
// `

const PostDetailWrapper = styled.div`
  margin: 25px;
`

const PostContentWrapper = styled.div`
  margin: 10px 0;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;

  color: #7A7A7A;
`
const PostContentImage = styled.img`
  width:100vw;
  margin-left: calc(-50vw + 50%);
`