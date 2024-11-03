import { queryClient } from "@/app/config/tanstack.query"
import { addComment } from "@/entities/comment/api"
import { CommentInput, CommentsOfPost } from "@/entities/comment/model"
import { useMutation } from "@tanstack/react-query"

export function useMutationCommentAdd() {
  return useMutation({
    mutationFn: (comment: CommentInput) => addComment(comment),
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.postId, "comments"], (commentsOfPost: CommentsOfPost) => {
        return {
          ...commentsOfPost,
          comments: [...commentsOfPost.comments, data],
        }
      })

      // 낙관적 업데이트 후 캐시 무효화
      // queryClient.invalidateQueries({ queryKey: ["posts", data.postId, "comments"] })
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error)
    },
  })
}
