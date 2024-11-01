import { fetchCommentsByPostId } from "@/entities/comment/api"
import { PostId } from "@/entities/post/model"
import { useComment } from "@/features/comment/model/useComment.ts"
import { useEffect } from "react"

export function useQueryComments(postId: PostId) {
  const { comments, setComments } = useComment()

  useEffect(() => {
    const queryComments = async (postId: PostId) => {
      // 이미 불러온 댓글이 있으면 다시 불러오지 않음
      if (comments[postId]) {
        return
      }

      try {
        const data = await fetchCommentsByPostId(postId)
        setComments((prev) => ({ ...prev, [postId]: data }))
      } catch (error) {
        console.error("댓글 가져오기 오류:", error)
      }
    }
    void queryComments(postId)
  }, [postId, comments, setComments])

  const commentsOfPost = comments[postId]?.comments || []

  return new (class {
    commentsOfPost = commentsOfPost
  })()
}
