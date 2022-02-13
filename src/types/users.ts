export interface User {
  _id: string
  name: string
  email: string
  profilePhoto: string
  password: string
  postCount: number
  isAdmin: boolean
  isFollowing: boolean
  isUnFollowing: boolean
  isAccountVerified: boolean
  viewedBy: string[]
  followers: string[]
  following: string[]
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
