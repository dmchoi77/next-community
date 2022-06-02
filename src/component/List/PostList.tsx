import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { PostProps, PostsProps } from '../../types/type';
import PostInfo from './PostInfo';
import UserActivity from './UserActivity';
import Link from 'next/link';
import useInfifitiScroll from '../../hooks/useInfiniteScroll';

const PostList: FunctionComponent<PostsProps> = ({
  posts,
  selectedCategory,
}: PostsProps) => {
  // 포스팅 최신글이 상단으로 가도록 정렬
  posts.sort(
    (a, b) => new Date(b.writtenAt).getTime() - new Date(a.writtenAt).getTime()
  );
  const { containerRef, postList } = useInfifitiScroll(selectedCategory, posts);
  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        (
          {
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
            writerProfileUrl,
          }: PostProps,
          index: number
        ) => {
          // 포스팅에 이미지가 여러 장일 경우 맨 처음 이미지를 썸네일로 지정
          if (imageUrl !== null && typeof imageUrl === 'object') {
            imageUrl = imageUrl[0];
          }
          return (
            <PostWrapper key={index}>
              <Link href={`/community/post/${id}`}>
                <a>
                  <PostInfo
                    writerProfileUrl={writerProfileUrl}
                    writerNickName={writerNickName}
                    categoryName={categoryName}
                    writtenAt={writtenAt}
                  />
                  <PostTitle>{title}</PostTitle>
                  <PostContent>{content}</PostContent>
                  {imageUrl ? <ContentImage src={imageUrl} /> : null}
                </a>
              </Link>
              <UserActivity
                viewCount={viewCount}
                likeCount={likeCount}
                commentCount={commentCount}
              />
              <Divider />
            </PostWrapper>
          );
        }
      )}
    </PostListWrapper>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  height: 100vh;
  margin: 0 26px;
`;

const PostWrapper = styled.div`
  height: auto;
  // width: 360px;
`;
const PostTitle = styled.div`
  height: 21px;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const PostContent = styled.div`
  margin: 6px 0 6px;
  height: 44px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #7a7a7a;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 4px;
  object-fit: cover;
`;

const Divider = styled.p`
  height: 3px;
  background-color: #e8e8e8;
  // left: -26px;
  position: relative;
  margin: 25px 0 26px;
`;
