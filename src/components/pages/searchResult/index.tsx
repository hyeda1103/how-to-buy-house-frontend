import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { RootState } from '^/store';
import { fetchCategoriesAction } from '^/store/slices/category';
import { fetchPostsAction } from '^/store/slices/post';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import PostCard from '^/components/organisms/postCard';
import CategoryList from '^/components/organisms/categoryList';
import {
  Container,
} from './styles';

interface Props {
  match: {
    params: {
      keyword?: string
      pageNumber?: number
    }
  }
}

function SearchResultPage({ match }: Props): JSX.Element {
  const { search } = useLocation();
  const { keyword, category } = queryString.parse(search);

  const dispatch = useDispatch();
  const {
    postList, loading, error, likes, disLikes,
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (typeof keyword === 'string' && typeof category === 'string') {
      const filterData = {
        category,
        keyword,
      };
      dispatch(fetchPostsAction(filterData));
    }
  }, [dispatch, likes, disLikes, keyword, category]);

  return (
    <SingleColumnLayout>
      <div>
        {error && (
          <p>{error}</p>
        )}
      </div>
      <Container>
        {postList?.length && (
          postList.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          )))}
      </Container>
    </SingleColumnLayout>
  );
}

export default SearchResultPage;
