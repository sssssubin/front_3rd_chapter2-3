import { Edit2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useCommentStore } from "../model/stores/useCommentStore"
import { Comment } from "../../../entities/Comment/model/types"

export const EditCommentButton = ({ comment }: { comment: Comment }) => {
  const { setSelectedComment, setShowEditCommentDialog } = useCommentStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedComment(comment)
        setShowEditCommentDialog(true)
      }}
    >
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
