import React, { FunctionComponent, useState, useEffect } from "react";
import styled from '@emotion/styled';
import { PostProps, PostsProps } from '../../types/type';
import PostInfo from './PostInfo';
import UserActivity from './UserActivity';
import Link from 'next/link';

const PostList: FunctionComponent<PostsProps> = ({ posts }: PostsProps) => {

  // 포스팅 최신글이 상단으로 가도록 정렬
  posts.sort((a, b) =>
    new Date(b.writtenAt).getTime() - new Date(a.writtenAt).getTime())

  return (
    <PostListWrapper>
      {
        posts.map(({
          categoryPk,
          categoryName,
          id,
          title,
          content,
          viewCount,
          likeCount,
          commentCount,
          imageUrl,
          writtenAt,
          writerNickName,
          writerProfileUrl }: PostProps, index: number) => {
          // 포스팅에 이미지가 여러 장일 경우 맨 처음 이미지를 썸네일로 지정
          if (imageUrl !== null && typeof imageUrl === 'object') {
            imageUrl = imageUrl[0]
          }
          return (
            <PostWrapper key={index}>
              <Link href={`/community/post/${id}`}>
                <a>
                  <PostInfo writerNickName={writerNickName} categoryName={categoryName} title={title} writtenAt={writtenAt} />
                  <Content>{content}</Content>
                  {imageUrl ?
                    <Image src={imageUrl} /> : null
                  }
                </a>
              </Link>
              <UserActivity viewCount={viewCount} likeCount={likeCount} commentCount={commentCount} />
              <Contour />
            </PostWrapper>
          )
        })
      }
    </PostListWrapper>

  )
}

export default PostList;

const PostListWrapper = styled.div`
  height: 100vh;
  margin: 0 26px;
`

const PostWrapper = styled.div`
  height: auto;
  width: 100%;
`

const Content = styled.div`
  margin: 6px 0 6px;
  height: 44px;
  left: 7.78%;
  right: 6.11%;
  top: calc(50% - 44px/2 - 144.5px);

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #7A7A7A;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Image = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 4px;
  object-fit: cover;
`

const Contour = styled.p`
  height: 3px;
  background-color: #E8E8E8;
  // left: -26px;
  position: relative;
  margin: 25px 0 26px;
`