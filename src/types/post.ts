import { Comment } from './comment';
import { User } from './users';

export interface PostCreate {
  _id?: string
  title: string
  description: string
  category: string
  image: any
}

export interface Post {
  _id?: string
  title: string
  description: string
  category: string
  image: any
  likes: string[]
  disLikes: string[]
  viewCounts: number
  isLiked: boolean
  isDisLiked: boolean
  user: User
  comments: Array<Comment>
  createdAt: string
  updatedAt: string
}
