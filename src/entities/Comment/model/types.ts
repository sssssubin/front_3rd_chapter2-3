export interface Comment {
  id: number
  body: string
  postId: number
  user: {
    username: string
  }
  likes: number
}

export type AddComment = Pick<Comment, "body" | "postId"> & { userId: number }
