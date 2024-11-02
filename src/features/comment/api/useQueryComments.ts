import { fetchCommentsByPostId } from "@/entities/comment/api"
import { PostId } from "@/entities/post/model"
import { useQuery } from "@tanstack/react-query"

export function useQueryComments(postId: PostId) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPostId(postId),
  })
}
