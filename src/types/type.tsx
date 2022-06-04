// type들을 따로 관리
// UPDATE: 2022-06-04

export interface CategoryProps {
  categoryPk: number;
  categoryCode: string;
  categoryName: string;
}

export interface CategoriesProps {
  currentCategory: any;
}

export interface PostProps {
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

export interface PostsProps {
  posts: PostProps[];
  selectedCategory: any;
}

export interface PostInfoProps {
  writerProfileUrl: string;
  writerNickName: string;
  categoryName: string;
  writtenAt: string;
  id?: number;
}

export interface UserActivityProps {
  viewCount?: number;
  likeCount: number;
  commentCount: number;
}
