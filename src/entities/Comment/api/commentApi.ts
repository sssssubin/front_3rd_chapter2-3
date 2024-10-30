import { Comment } from "../model/types"

export const commentApi = {
  // 댓글 목록 조회
  fetchComments: async (postId: string | number): Promise<Comment[]> => {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    console.log("댓글 조회되니?", data)
    return data.comments
  },

  // 댓글 생성
  addComment: async (comment: { body: string; postId: number | string; userId: number }): Promise<Comment> => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    return response.json()
  },

  // 댓글 수정
  updateComment: async (id: number, body: string): Promise<Comment> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    })
    return response.json()
  },

  // 댓글 삭제
  deleteComment: async (id: number, postId: string | number): Promise<void> => {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
  },
}
