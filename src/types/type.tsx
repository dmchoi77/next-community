// type들을 따로 관리
// UPDATE: 2022-05-27

export type CategoryProps = {
  categoryPk: number;
  categoryCode: string;
  categoryName: string;
};

export type CategoriesProps = {
  currentCategory: any;
};

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
};

export type PostsProps = {
  posts: PostProps[];
};

export type PostInfoProps = {
  writerProfileUrl: string;
  writerNickName: string;
  categoryName: string;
  writtenAt: string;
};

export type UserActivityProps = {
  viewCount?: number;
  likeCount: number;
  commentCount: number;
};
