import React from 'react';
import { useDispatch } from 'react-redux';
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

interface Props {
  post: T.Post
}

function PostCard({ post }: Props) {
  const dispatch = useDispatch();
  return (
    <Link to={`/posts/${post?._id}`}>
      <Card key={post?._id}>
        {/* Post image */}
        <Thumbnail
          src={post?.image}
          alt={post?.title}
        />
        <InfoWrapper>
          <Title>
            {post?.title}
          </Title>
          {/* Likes, views disLikes */}
          <StatsWrapper>
            {/* Likes */}
            {post?.likes && (
              <StatItem>
                {/* Togle like  */}
                <HeartIcon onClick={() => dispatch(toggleAddLikesToPost(post?._id))} />
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
    </Link>
  );
}

export default PostCard;
