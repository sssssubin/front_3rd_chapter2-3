import { User } from "@/entities/user/model/User"

export interface PostList {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number

  // extends
  author: User
}

export type PostId = Post["id"]

export interface Reactions {
  likes: number
  dislikes: number
}

export type PostInput = Partial<Post>

export const addPosts = (posts: Post[], post: Post) => [post, ...posts]

export const updatePosts = (posts: Post[], data: Post) => posts.map((post) => (post.id === data.id ? data : post))
