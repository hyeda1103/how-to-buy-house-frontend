import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../../store';
import { fetchCategoriesAction } from '../../../store/slices/category';
import { fetchPostsAction, toggleAddLikesToPost, toggleAddDisLikesToPost } from '../../../store/slices/post';
import SingleColumnLayout from '../../templates/singleColumnLayout';
import DateFormatter from '../../../utils/dateFormatter';
import {
  Grid,
  MainGrid,
  SubGrid,
  Card,
  InfoWrapper,
  StatsWrapper,
  StatItem,
  Thumbnail,
  ThumbsUpIcon,
  ThumbsDownIcon,
  EyeIcon,
  AuthorInfoWrapper,
  ProfilePhoto,
  Title,
  Description,
  PostedDate,
  PostDetails,
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
            <Card key={post?._id}>
              {/* Post image */}
              <Thumbnail
                src={post?.image}
                alt={post?.title}
              />
              <InfoWrapper>
                {/* Likes, views disLikes */}
                <StatsWrapper>
                  {/* Likes */}
                  <StatItem>
                    {/* Togle like  */}
                    <ThumbsUpIcon
                      onClick={() => dispatch(toggleAddLikesToPost(post?._id))}
                    />
                    {post?.likes?.length}
                  </StatItem>
                  {/* Dislike */}
                  <StatItem>
                    <ThumbsDownIcon
                      onClick={() => dispatch(toggleAddDisLikesToPost(post?._id))}
                    />
                    {post?.disLikes?.length}
                  </StatItem>
                  {/* Views */}
                  <StatItem>
                    <EyeIcon />
                    {post?.viewCounts}
                  </StatItem>
                </StatsWrapper>
                <Link to={`/posts/${post?._id}`}>
                  <PostDetails>
                    <Title>
                      {post?.title}
                    </Title>
                    <PostedDate>
                      <DateFormatter date={post?.createdAt} />
                    </PostedDate>
                    <Description>{post?.description}</Description>
                  </PostDetails>
                </Link>
                {/* User Avatar */}
                <Link
                  to={`/profile/${post?.user?._id}`}
                >
                  <AuthorInfoWrapper>
                    <ProfilePhoto
                      src={post?.user?.profilePhoto}
                      alt={post?.user?.name}
                    />
                    <p>
                      {post?.user?.name}
                    </p>
                  </AuthorInfoWrapper>
                </Link>
              </InfoWrapper>
            </Card>
          ))}
        </MainGrid>
      </Grid>
    </SingleColumnLayout>
  );
}

export default PostListPage;
