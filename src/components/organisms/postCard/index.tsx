import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleAddLikesToPost, toggleAddDisLikesToPost } from '^/store/slices/post';
import DateFormatter from '^/utils/dateFormatter';
import * as T from '^/types';
import {
  Card,
  InfoWrapper,
  StatsWrapper,
  StatItem,
  Thumbnail,
  ThumbsUpIcon,
  ThumbsDownIcon,
  EyeIcon,
  Title,
  PostedDate,
  PostDetails,
} from './styles';

interface Props {
  post: T.Post
}

function PostCard({ post }: Props) {
  const dispatch = useDispatch();
  return (
    <Card key={post?._id}>
      {/* Post image */}
      <Thumbnail
        src={post?.image}
        alt={post?.title}
      />
      <InfoWrapper>
        {/* Likes, views disLikes */}
        <StatsWrapper>
          
            <Title>
              {post?.title}
            </Title>
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
            <EyeIcon />
            {post?.viewCounts}
          </StatItem>
        </StatsWrapper>
        <Link to={`/posts/${post?._id}`}>
          <PostDetails>
          </PostDetails>
        </Link>
      </InfoWrapper>
    </Card>
  );
}

export default PostCard;
