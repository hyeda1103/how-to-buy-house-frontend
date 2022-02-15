import { Post } from './post';
import { User } from './users';

export interface CreateComment {
  postId: Post['_id']
  description: string
}

export interface Comment {
  id: string
  post: Post
  user: User
  description: string
}
