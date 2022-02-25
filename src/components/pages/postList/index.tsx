import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '^/store';
import { fetchCategoriesAction } from '^/store/slices/category';
import { fetchPostsAction } from '^/store/slices/post';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import PostCard from '^/components/organisms/postCard';
import {
  Grid,
  MainGrid,
  SubGrid,
  CategoryWrapper,
  CategoryList,
  CategoryItem,
} from './styles';

function PostListPage(): JSX.Element {
  const dispatch = useDispatch();
  const {
    postList, loading, error, likes, disLikes,
  } = useSelector((state: RootState) => state.post);
  useEffect(() => {
    dispatch(fetchPostsAction(''));
  }, [dispatch, likes, disLikes]);
  const { categoryList, loading: loadingCategory, error: errorCategory } = useSelector((state: RootState) => state.category);
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  return (
    <SingleColumnLayout>
      <Grid>
        <SubGrid>
          <CategoryWrapper>
            <CategoryList>
              <CategoryItem onClick={() => dispatch(fetchPostsAction(''))}>
                모든 포스트 보기
              </CategoryItem>
              {categoryList && (
                categoryList.map((category) => (
                  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
                  /* eslint-disable jsx-a11y/click-events-have-key-events */
                  <CategoryItem
                    key={category._id}
                    onClick={() => dispatch(fetchPostsAction(category?.title))}
                  >
                    {category.title}
                  </CategoryItem>
                ))
              )}
            </CategoryList>
          </CategoryWrapper>
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
