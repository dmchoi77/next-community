// type들을 따로 관리
// UPDATE: 2022-05-27

export type PostProps = {
  categoryPk: number;
  categoryName: string;
  id: number;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  imageUrl: null | string;
  writtenAt: string;
  writerNickName: string;
  writerProfileUrl: string;
}

export type PostsProps = {
  posts: PostProps[],
}

export type PostInfoProps = {
  writerNickName: string;
  categoryName: string;
  title: string
  writtenAt: string
}