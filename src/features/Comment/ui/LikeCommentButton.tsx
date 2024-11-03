import { ThumbsUp } from "lucide-react"
import { Button } from "../../../shared/ui"
import { LikeComment } from "./LikeComment"
import { Comment } from "../../../entities/Comment/model/types"

export const LikeCommentButton = ({ comment, postId }: { comment: Comment; postId: number | string }) => (
  <Button variant="ghost" size="sm" onClick={() => LikeComment(comment.id, postId)}>
    <ThumbsUp className="w-3 h-3" />
    <span className="ml-1 text-xs">{comment.likes}</span>
  </Button>
)
