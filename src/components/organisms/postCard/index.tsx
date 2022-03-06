import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Dompurify from 'dompurify';

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
  AuthorInfoWrapper,
  ProfilePhoto,
  Title,
  Description,
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
            <Description dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(post?.description),
            }}
            />

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
  );
}

export default PostCard;
