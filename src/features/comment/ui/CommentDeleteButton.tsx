import { deleteComment } from "@/entities/comment/api"
import { type Comment } from "@/entities/comment/model"
import { useComment } from "@/features/comment/model/useComment"
import { Button } from "@/shared/ui"
import { Trash2 } from "lucide-react"

export function CommentDeleteButton({ comment }: { comment: Comment }) {
  const { removeCommentByPostId } = useComment()

  async function handleCommentDelete() {
    try {
      await deleteComment(comment.id)
      removeCommentByPostId(comment.postId, comment.id)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleCommentDelete}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
