import { patchComment } from "@/entities/comment/api"
import { type Comment } from "@/entities/comment/model"
import { useComment } from "@/features/comment/model/useComment"
import { Button } from "@/shared/ui"
import { ThumbsUp } from "lucide-react"

export function CommentLikeButton({ comment }: { comment: Comment }) {
  const { modifyComment } = useComment()

  async function handleCommentLike() {
    try {
      const data = await patchComment(comment.postId, { likes: comment.likes + 1 })
      modifyComment(comment.postId, comment.id, data)
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleCommentLike}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
