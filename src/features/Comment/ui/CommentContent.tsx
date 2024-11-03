import { highlightText } from "../../../shared/lib/highlightText"
import { Comment } from "../../../entities/Comment/model/types"

export const CommentContent = ({ comment, searchQuery }: { comment: Comment; searchQuery: string }) => (
  <div className="flex items-center space-x-2 overflow-hidden">
    <span className="font-medium truncate">{comment.user.username}:</span>
    <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
  </div>
)
