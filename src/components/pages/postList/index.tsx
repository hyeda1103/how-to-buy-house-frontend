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

function PostListPage(): JSX.Element {
  const [categoryInView, setCategoryInView] = useState<string>('');
  const dispatch = useDispatch();
  const {
    postList, loading, error, likes, disLikes,
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchPostsAction(categoryInView));
  }, [dispatch, likes, disLikes, categoryInView]);

  const { categoryList, loading: loadingCategory, error: errorCategory } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handleClick = (categoryName: string) => (e: MouseEvent) => {
    e.preventDefault();
    dispatch(fetchPostsAction(categoryName));
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
