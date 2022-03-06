import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '^/store';
import { fetchCategoriesAction } from '^/store/slices/category';
import { fetchPostsAction } from '^/store/slices/post';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import PostCard from '^/components/organisms/postCard';
import CategoryList from '^/components/organisms/categoryList';
import {
  Grid,
  MainGrid,
  SubGrid,
} from './styles';

interface Props {
  match: {
    params: {
      keyword?: string
      pageNumber?: number
    }
  }
}

function PostListPage({ match }: Props): JSX.Element {
  const { keyword } = match.params;
  const [categoryInView, setCategoryInView] = useState<string>('');
  const dispatch = useDispatch();
  const {
    postList, loading, error, likes, disLikes,
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    const filterData = {
      category: categoryInView,
      keyword,
    };
    dispatch(fetchPostsAction(filterData));
  }, [dispatch, likes, disLikes, categoryInView, keyword]);

  const { categoryList, loading: loadingCategory, error: errorCategory } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handleClick = (categoryName: string) => (e: MouseEvent) => {
    e.preventDefault();
    const filterData = {
      category: categoryInView,
      keyword,
    };
    dispatch(fetchPostsAction(filterData));
    setCategoryInView(categoryName);
  };

  return (
    <SingleColumnLayout>
      <Grid>
        <SubGrid>
          <CategoryList
            categoryList={categoryList}
            handleClick={handleClick}
          />
        </SubGrid>
        <MainGrid>
          {postList && postList.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))}
        </MainGrid>
      </Grid>
    </SingleColumnLayout>
  );
}

export default PostListPage;
