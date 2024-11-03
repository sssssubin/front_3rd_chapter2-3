import { useCommentStore } from "../model/stores/useCommentStore"
import { AddCommentButton } from "./AddCommentButton"
import { CommentHeader } from "./CommentHeader"
import { CommentItem } from "./CommentItem"

export const CommentList = ({ postId }: { postId: number | string }) => {
  const { comments } = useCommentStore()

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <CommentHeader />
        <AddCommentButton postId={postId} />
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => <CommentItem key={comment.id} comment={comment} postId={postId} />)}
      </div>
    </div>
  )
}
