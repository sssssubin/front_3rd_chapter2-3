import { PostId } from "@/entities/post/model"
import { useComment } from "@/features/comment/model/useComment"
import { useDialog } from "@/features/dialog/model/useDialog"
import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

export function CommentAddButton({ postId }: { postId: PostId }) {
  const { setNewComment } = useComment()
  const { setShowAddCommentDialog } = useDialog()

  function handleAddCommentDialogOpen() {
    setNewComment((prev) => ({ ...prev, postId }))
    setShowAddCommentDialog(true)
  }

  return (
    <Button size="sm" onClick={handleAddCommentDialogOpen}>
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}
