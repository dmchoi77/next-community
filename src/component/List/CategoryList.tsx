import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'

const CategoryList: FunctionComponent = () => {
  const [categories, setCategories] = useState([
    "React", "Vue", "Angular", "JavaScript", "TypeScript", "Redux"
  ])
  return (
    <CategoryListWrapper>
      {categories.map((category, index) => {
        return (
          <CategoryWrapper>
            <CategoryMenu />
            <CategoryLabel>
              {category}
            </CategoryLabel>
          </CategoryWrapper>)
      })
      }
    </CategoryListWrapper>
  )
}

export default CategoryList

const CategoryListWrapper = styled.div`
  margin-left: 22px;
  margin-bottom: 42px;
  overflow-y: scroll;

  display: flex;
  gap: 4px;

  // 스크롤 숨김
  &::-webkit-scrollbar{
    display: none; 
  }
`

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #FFFFFF;
  width: fit-content;

  border-radius: 20px;
  border: 1px solid #E8E8E8;
`
const CategoryLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 12px 16px;
  color: #7A7A7A;
  width: max-content;
  cursor: pointer;
`

const CategoryMenu = styled.input`
  opacity: 0;
  list-style: none;
  width: 0px;
  display: none;
  cursor: pointer;
  
  &:checked + ${CategoryLabel} {
    background: #2C7FFF;
    border-radius: 20px;
    color: #ffff;
  }
`;