import { Comment, CommentList } from "@/entities/comment/model"

export const fetchComments = async (postId: number): Promise<CommentList> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  return response.json()
}

export const createComment = async (comment: Omit<Comment, "id">): Promise<Comment> => {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return response.json()
}

export const deleteComment = async (id: number): Promise<void> => {
  await fetch(`/api/comments/${id}`, { method: "DELETE" })
}

export const putComment = async (id: number, comment: Partial<Comment>): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return response.json()
}
