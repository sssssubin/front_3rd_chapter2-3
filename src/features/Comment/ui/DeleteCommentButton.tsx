import { Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useCommentService } from "../model/services/useCommentService"
import { Comment } from "../../../entities/Comment/model/types"

export const DeleteCommentButton = ({ comment, postId }: { comment: Comment; postId: number | string }) => {
  const { removeComment } = useCommentService()

  return (
    <Button variant="ghost" size="sm" onClick={() => removeComment(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
