import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { CategoriesProps, CategoryProps } from '../../types/type';

const CategoryList: FunctionComponent<CategoriesProps> = ({
  currentCategory,
}: CategoriesProps) => {
  const [categories, setCategories] = useState([
    '전체글',
    '인기글',
    'React',
    'Vue',
    'Angular',
    'JavaScript',
    'TypeScript',
    'Redux',
  ]);
  // 처음 렌더링 시 맨 처음 카테고리가 checked 되게
  useEffect(() => {
    let tag = document.querySelector('input[type=checkbox]');
    tag.setAttribute('checked', 'true');
  }, []);

  const handleCategory = (event: any) => {
    currentCategory(event.target.innerHTML);

    document
      .querySelectorAll(`input[type=checkbox]`)
      .forEach((category) => ((category as HTMLInputElement).checked = false));

    event.checked = true;
  };

  return (
    <CategoryListWrapper>
      {categories.map((category, categoryPk, index) => {
        return (
          <CategoryWrapper key={categoryPk}>
            <CategoryMenu id={'checkbox' + categoryPk} type="checkbox" />
            <CategoryLabel
              htmlFor={'checkbox' + categoryPk}
              onClick={handleCategory}
            >
              {category}
            </CategoryLabel>
          </CategoryWrapper>
        );
      })}
    </CategoryListWrapper>
  );
};

export default CategoryList;

const CategoryListWrapper = styled.div`
  margin-left: 22px;
  margin-bottom: 42px;
  overflow-y: scroll;

  display: flex;
  gap: 4px;

  // 스크롤 숨김
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  width: fit-content;

  border-radius: 20px;
  border: 1px solid #e8e8e8;
`;
const CategoryLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 12px 16px;
  color: #7a7a7a;
  width: max-content;
  cursor: pointer;
`;

const CategoryMenu = styled.input`
  opacity: 0;
  list-style: none;
  width: 0px;
  display: none;
  cursor: pointer;

  &:checked + ${CategoryLabel} {
    background: #2c7fff;
    border-radius: 20px;
    color: #ffff;
  }
`;
