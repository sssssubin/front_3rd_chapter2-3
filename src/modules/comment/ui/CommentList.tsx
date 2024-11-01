// 댓글 렌더링
import { PostId } from "@/entities/post/model"
import { useQueryComments } from "@/features/comment/api"
import { useComment } from "@/features/comment/model/useComment.ts"
import { useDialog } from "@/features/dialog/model/useDialog.ts"
import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"
import { CommentListItem } from "./CommentListItem"

// ui/CommentList.tsx
export function CommentList({ postId }: { postId: PostId }) {
  const { commentsOfPost } = useQueryComments(postId)

  const { setNewComment } = useComment()
  const { setShowAddCommentDialog } = useDialog()

  // 댓글 추가 대화상자
  function handleAddCommentDialogOpen() {
    setNewComment((prev) => ({ ...prev, postId }))
    setShowAddCommentDialog(true)
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleAddCommentDialogOpen}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>

      <div className="space-y-1">
        {commentsOfPost.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
