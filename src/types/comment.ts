import { Post } from './post';
import { User } from './users';

export interface CommentCreate {
  postId: Post['_id']
  description: string
}

export interface Comment {
  _id: string
  post: Post
  user: User
  description: string
  createdAt: string
}
