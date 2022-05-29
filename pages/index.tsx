import React, { FunctionComponent, useState, useEffect } from 'react';
import Header from '../src/component/List/Header';
import CategoryList from '../src/component/List/CategoryList';
import PostList from '../src/component/List/PostList';
import axios from 'axios';
import { PostProps } from '../src/types/type';
import Head from 'next/head';
import SkeletonUI from '../src/component/List/SkeletonUI';
import PostButton from '../src/component/List/PostButton';

const Home: FunctionComponent = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [selectingPosts, setSelectingPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    const postList = await axios.get('http://localhost:4000/posts');
    setPosts(postList.data);
    setSelectingPosts(postList.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const currentCategory = (selectedCategory: any) => {
    let selectedPosts;

    if (selectedCategory === '전체글') {
      selectedPosts = posts;
    } else if (selectedCategory === '인기글') {
      selectedPosts = posts.filter((post) => post.viewCount >= 100);
    } else {
      selectedPosts = posts.filter(
        (post) => post.categoryName === selectedCategory
      );
    }
    setSelectingPosts(selectedPosts);
  };

  return (
    <>
      <Head>
        <title>dmchoi</title>
      </Head>
      <Header />
      <CategoryList currentCategory={currentCategory} />
      {isLoading && <SkeletonUI />}
      {!isLoading && <PostList posts={selectingPosts} />}
      <PostButton />
    </>
  );
};

export default Home;
