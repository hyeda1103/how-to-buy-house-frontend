import { User } from './users';

export interface PostCreate {
  title: string
  description: string
  category: string
  image: any
}

export interface Post {
  id?: string
  title: string
  description: string
  category: string
  image: any
  likes: string[]
  dislikes: string[]
  viewCounts: number
  isLiked: boolean
  isDisLiked: boolean
  user: User
  createdAt: string
  updatedAt: string
}
