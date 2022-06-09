// 새 포스팅 페이지
// UPDATE: 2022-06-09

import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import UploadImages from '../../../src/component/PostNew/UploadImages';
import CategoryBox from '../../../src/component/PostNew/CategoryBox';
import { useRouter } from 'next/router';

const PostNew: FunctionComponent = () => {
  const [categoryPk, setCategoryPk] = useState(0);
  const [categoryName, setCategoryName] = useState('React');
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [images, setImages] = useState<[]>([]);
  const router = useRouter();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const onAddImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowSelectImageList = e.target.files;
    const nowImageURLList: any = [...images];

    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const nowImageUrl: any = URL.createObjectURL(nowSelectImageList[i]);
      nowImageURLList.push(nowImageUrl);
    }

    if (nowImageURLList.length <= 5) setImages(nowImageURLList);
    else alert('최대 5개의 이미지 첨부가 가능합니다.');
  };

  const onRemoveImage = (e: React.MouseEvent<HTMLImageElement>): void => {
    const selectedIndex = Number(e.currentTarget.id);
    let temp: [] = [...images];
    temp.splice(selectedIndex, 1);
    setImages(temp);
  };

  const categoryHandler = () => {
    let selecting: HTMLElement | any = document.getElementById('categories');
    setCategoryPk(selecting.options[selecting.selectedIndex].value);
    setCategoryName(selecting.options[selecting.selectedIndex].innerHTML);
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
        writerNickName: localStorage.getItem('nickname') || "사용자",
        writerProfileUrl: localStorage.getItem('profile_image') || `${"/images/user.png"}`,
      });
    } catch (err) {
      console.error(err);
    }

    router.push('/community/list');
  };

  return (
    <PostNewWrapper>
      <HeaderWrapper>
        <HeaderTitle>글쓰기</HeaderTitle>
      </HeaderWrapper>
      <CategoryBoxWrapper>
        <CategoryBox categoryHandler={categoryHandler} />
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
      <FooterWrapper>
        <CancelButton onClick={() => router.push('/community/list')}>취소</CancelButton>
        <WriteButton onClick={() => onPost()}>작성</WriteButton>
      </FooterWrapper>
    </PostNewWrapper>
  );
};

export default PostNew;

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

const FooterWrapper = styled.div`
  display: flex;
  gap: 10px;

  padding-top: 15px;
`;

const CancelButton = styled.button`
  width: 180px;
  height: 50px;

  border: 0.7px solid #60606075;
  border-radius: 19px;

  background-color: #ffff;

  font-weight: 500;
  font-size: 14px;
`;

const WriteButton = styled.button`
  width: 180px;
  height: 50px;

  border: transparent;
  border-radius: 19px;

  background-color: #7c27eb;

  font-weight: 500;
  font-size: 14px;
  color: #ffff;
`;
