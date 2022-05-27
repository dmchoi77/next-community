import React, { FunctionComponent, useState, useEffect } from "react";
import Header from "../src/component/List/Header";
import CategoryList from "../src/component/List/CategoryList";
import PostList from "../src/component/List/PostList";
import axios from "axios";
import { PostProps } from "../src/types/type";

const Home: FunctionComponent = () => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [selectingPosts, setSelectingPosts] = useState<PostProps[]>([]);

  const fetchPosts = async () => {
    const postList = await axios.get("http://localhost:4000/posts")
    setPosts(postList.data)
    setSelectingPosts(postList.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const currentCategory = (selectedCategory: any) => {
    let selectedPosts;

    if (selectedCategory === '전체글') {
      selectedPosts = posts
    }
    else if (selectedCategory === '인기글') {
      selectedPosts = posts.filter((post) => post.viewCount >= 100)
    }
    else {
      selectedPosts = posts.filter((post) => post.categoryName === selectedCategory)
    }
    setSelectingPosts(selectedPosts)
  }

  return (
    <>
      <Header />
      <CategoryList currentCategory={currentCategory} />
      <PostList posts={selectingPosts} />
    </>
  );
}

export default Home;
