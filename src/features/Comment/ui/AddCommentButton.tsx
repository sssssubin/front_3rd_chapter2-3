import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useCommentStore } from "../model/stores/useCommentStore"

export const AddCommentButton = ({ postId }: { postId: number | string }) => {
  const { newComment, setNewComment, setShowAddCommentDialog } = useCommentStore()

  return (
    <Button
      size="sm"
      onClick={() => {
        setNewComment({ ...newComment, postId })
        setShowAddCommentDialog(true)
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}
