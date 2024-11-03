import { usePostStore } from "../../Post/model/stores/usePostStore"
import { CommentActions } from "./CommentActions"
import { CommentContent } from "./CommentContent"
import { Comment } from "../../../entities/Comment/model/types"

export const CommentItem = ({ comment, postId }: { comment: Comment; postId: number | string }) => {
  const { searchQuery } = usePostStore()

  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <CommentContent comment={comment} searchQuery={searchQuery} />
      <CommentActions comment={comment} postId={postId} />
    </div>
  )
}
