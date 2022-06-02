// 새 포스팅 페이지
// UPDATE: 2022-05-30

import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CategoryProps } from '../../../src/types/type';
import axios from 'axios';
import UploadImages from '../../../src/component/PostNew/UploadImages';

const PostNew: FunctionComponent = () => {
  const [categoryPk, setCategoryPk] = useState(0);
  const [categoryName, setCategoryName] = useState('React');
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [images, setImages] = useState<[]>([]);

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const onAddImages = (e: any) => {
    const nowSelectImageList = e.target.files;
    const nowImageURLList: any = [...images];

    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const nowImageUrl: any = URL.createObjectURL(nowSelectImageList[i]);
      nowImageURLList.push(nowImageUrl);
    }

    if (nowImageURLList.length <= 5) setImages(nowImageURLList);
    else alert('최대 5개의 이미지 첨부가 가능합니다.');
  };

  const onRemoveImage = (e: any) => {
    const selectedIndex = e.target.id;
    let temp: [] = [...images];
    temp.splice(selectedIndex, 1);

    setImages(temp);
  };

  const onPost = async () => {
    try {
      if (!title) {
        alert('제목을 입력해주세요.');
        return;
      } else {
        if (typeof title === 'string' && title.length > 100) {
          alert('제목은 100자 이하여야합니다.');
          return;
        }
      }

      if (!content) {
        alert('내용을 입력해주세요');
        return;
      }

      const fetchData = (await axios.get(`http://localhost:4000/posts`)).data;
      const lastIndex = fetchData[fetchData.length - 1].id;
      let currnetTime = new Date(+new Date() + 3240 * 10000).toISOString();

      axios.post('http://localhost:4000/posts', {
        categoryPk: categoryPk,
        categoryName: categoryName,
        pk: lastIndex + 1,
        id: lastIndex + 1,
        title: title,
        content: content,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        imageUrl: images,
        writtenAt: currnetTime.slice(0, currnetTime.length - 5),
        writerNickName: 'dmchoi',
        writerProfileUrl: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PostNewWrapper>
      <HeaderWrapper>
        <HeaderTitle>글쓰기</HeaderTitle>
      </HeaderWrapper>
      <CategoryBoxWrapper>
        <CategoryBox
          setCategoryPk={setCategoryPk}
          setCategoryName={setCategoryName}
        />
      </CategoryBoxWrapper>
      <TitleInput
        type="text"
        placeholder="제목을 작성해주세요"
        max-length="100"
        onChange={onTitleChange}
      />
      <ContentInput
        placeholder="내용을 작성해주세요.&#13;&#10;◎ 사진 및 외부 콘텐츠 첨부시 영향력 상승!&#13;&#10;◎ 뉴스, 블로그 등 외부 콘텐츠는 https:// 링크를 붙여 넣으세요. 본문에 썸네일로 표시됩니다.&#13;&#10;◎ 광고글 금지. 서비스 이용이 제한됩니다."
        onChange={onContentChange}
      />
      <UploadImages
        images={images}
        onRemoveImage={onRemoveImage}
        onAddImages={onAddImages}
      />
    </PostNewWrapper>
  );
};

export default PostNew;

const CategoryBox = ({ setCategoryPk, setCategoryName }: any) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/categories')
      .then((res) => setCategories(res.data.splice(2, res.data.length)));
  }, []);

  const categoryHandler = () => {
    let selecting: any = document.getElementById('categories');
    setCategoryPk(selecting.options[selecting.selectedIndex].value);
    setCategoryName(selecting.options[selecting.selectedIndex].innerHTML);
  };

  return (
    <select
      name="categories"
      id="categories"
      onChange={categoryHandler}
      style={{
        fontWeight: '700',
        fontSize: '14px',
        lineHeight: '24px',
        border: 'none',
      }}
    >
      {categories.map((category) => {
        return (
          <option key={category.categoryPk} value={category.categoryPk}>
            {category.categoryName}
          </option>
        );
      })}
    </select>
  );
};

const PostNewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: 50px;

  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffff;
  border-bottom: 1px solid #e8e8e8;
`;

const HeaderTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;

  text-align: center;
  color: #222222;
`;

const CategoryBoxWrapper = styled.div`
  border: none;
  border-bottom: 1px solid #e8e8e8;

  align-content: center;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
`;

const TitleInput = styled.input`
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  border: none;
  border-bottom: 1px solid #e8e8e8;

  input::placeholder {
    color: #b4b4b4;
  }
`;

const ContentInput = styled.textarea`
  height: 377px;
  padding: 10px 20px;

  border: none;

  resize: none; /* 사용자 임의 변경 불가 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  border-bottom: 1px solid #e8e8e8;
  
  input:placeholder {
    color: #b4b4b4;
  }
`;
