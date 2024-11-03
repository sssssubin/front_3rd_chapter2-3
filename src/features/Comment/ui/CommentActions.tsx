import { DeleteCommentButton } from "./DeleteCommentButton"
import { EditCommentButton } from "./EditCommentButton"
import { LikeCommentButton } from "./LikeCommentButton"
import { Comment } from "../../../entities/Comment/model/types"

export const CommentActions = ({ comment, postId }: { comment: Comment; postId: number | string }) => (
  <div className="flex items-center space-x-1">
    <LikeCommentButton comment={comment} postId={postId} />
    <EditCommentButton comment={comment} />
    <DeleteCommentButton comment={comment} postId={postId} />
  </div>
)
