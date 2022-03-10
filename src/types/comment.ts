import { Post } from './post';
import { User } from './users';
import * as T from '.';

export interface CommentCreate {
  postId: Post['_id']
  description: string
  depth?: number
  parentId?: string | null
  children?: Array<T.Comment>
}

export interface Comment {
  _id: string
  post: Post['_id']
  depth: number
  parentId: string | null
  children?: Array<T.Comment>
  user: User
  description: string
  createdAt: string
}
