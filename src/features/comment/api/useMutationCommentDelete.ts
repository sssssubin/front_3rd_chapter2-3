import { queryClient } from "@/app/config/tanstack.query"
import { deleteComment } from "@/entities/comment/api"
import { CommentsOfPost, type Comment } from "@/entities/comment/model"
import { useMutation } from "@tanstack/react-query"

export function useMutationCommentDelete() {
  return useMutation({
    mutationFn: (comment: Comment) => deleteComment(comment.id),
    onSuccess: (_, comment) => {
      // 낙관적 업데이트
      queryClient.setQueryData(["posts", comment.postId, "comments"], (commentsOfPost: CommentsOfPost) => {
        return {
          ...commentsOfPost,
          comments: commentsOfPost.comments.filter((c) => c.id !== comment.id),
        }
      })

      // 낙관적 업데이트 후 캐시 무효화
      // @NOTE: 원래는 해야하는데 dummy 데이터라서 무효화 안함
      // queryClient.invalidateQueries({ queryKey: ["posts", comment.postId, "comments"] })
    },
  })
}
