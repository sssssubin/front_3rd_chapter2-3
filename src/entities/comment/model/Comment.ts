import { PostId } from "@/entities/post/model"

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

export interface CommentUser {
  id: number
  username: string
  fullName: string
}

export type CommentId = Comment["id"]
export type CommentList = Record<PostId, Comment[]>

export interface CommentInput {
  body: string
  postId: number | null
  userId: number
}

// entities/comment/model/Comment.ts
export const updateCommentByPostId = (postId: number, data: Comment) => (prev: CommentList) => ({
  ...prev,
  [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
})

export const removeCommentByPostId = (postId: PostId, commentId: number) => (prev: CommentList) => ({
  ...prev,
  [postId]: prev[postId].filter((comment) => comment.id !== commentId),
})
