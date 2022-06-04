import React, { FunctionComponent, useEffect, useState } from 'react';
import { CategoryProps } from '../../../src/types/type';
import axios from 'axios';

const CategoryBox = ({ categoryHandler }) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/categories')
      .then((res) => setCategories(res.data.splice(2, res.data.length)));
  }, []);

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

export default CategoryBox;
