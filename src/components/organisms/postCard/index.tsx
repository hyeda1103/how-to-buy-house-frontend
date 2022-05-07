import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleAddLikesToPost } from '^/store/slices/post';
import * as T from '^/types';
import { ReactComponent as HeartIcon } from '^/assets/icons/heart.svg';
import { ReactComponent as ViewIcon } from '^/assets/icons/view.svg';
import {
  Card,
  InfoWrapper,
  StatsWrapper,
  StatItem,
  Thumbnail,
  Title,
} from './styles';
import CountFormatter from '^/utils/countFormatter';
import { RootState } from '^/store';

interface Props {
  post: T.Post
}

function PostCard({ post }: Props) {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: RootState) => state.auth);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleClick = () => {
    dispatch(toggleAddLikesToPost(post?._id));
    console.log(post?.likes);
  };

  return (
    <Card key={post?._id}>
      <Link to={`/posts/${post?._id}`}>
        {/* Post image */}
        <Thumbnail
          src={post?.image}
          alt={post?.title}
        />
      </Link>
      <InfoWrapper>
        <Title>
          {post?.title}
        </Title>
        {/* Likes, views disLikes */}
        <StatsWrapper>
          {/* Likes */}
          {post?.likes && (
            <StatItem disabled={!userAuth} isLiked={isLiked}>
              {/* Togle like  */}
              <HeartIcon onClick={handleClick} />
              <CountFormatter count={post?.likes.length} />
            </StatItem>
          )}
          {/* Dislike */}
          {post?.viewCounts && (
            <StatItem>
              <ViewIcon />
              <CountFormatter count={post?.viewCounts} />
            </StatItem>
          )}
        </StatsWrapper>
      </InfoWrapper>
    </Card>
  );
}

export default PostCard;
