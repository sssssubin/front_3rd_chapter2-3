import { PostId } from "@/entities/post/model"

export interface CommentUser {
  id: number
  username: string
  fullName: string
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

export type CommentId = Comment["id"]

export interface CommentsOfPost {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export type CommentList = Record<PostId, CommentsOfPost>

export interface CommentInput {
  body: string
  postId: number | null
  userId: number
}

export const addCommentToPost = (comments: CommentList, postId: PostId, newComment: Comment): CommentList => ({
  ...comments,
  [postId]: {
    ...comments[postId],
    comments: [...(comments[postId]?.comments || []), newComment],
    total: (comments[postId]?.total || 0) + 1,
    skip: comments[postId]?.skip || 0,
    limit: comments[postId]?.limit || 10,
  },
})

export const patchCommentByPostId = (
  comments: CommentList,
  postId: PostId,
  commentId: CommentId,
  data: Partial<Comment>,
) => ({
  ...comments,
  [postId]: {
    ...comments[postId],
    comments: comments[postId]?.comments.map((comment) =>
      comment.id === commentId //
        ? { ...comment, ...data }
        : comment,
    ),
  },
})

export const removeCommentByPostId = (comments: CommentList, postId: PostId, commentId: CommentId) => ({
  ...comments,
  [postId]: {
    ...comments[postId],
    comments: comments[postId]?.comments?.filter((comment) => comment.id !== commentId),
  },
})
