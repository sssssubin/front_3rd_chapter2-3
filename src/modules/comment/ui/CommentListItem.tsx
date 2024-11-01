import { deleteComment, patchComment } from "@/entities/comment/api"
import { type Comment } from "@/entities/comment/model"
import { useComment } from "@/features/comment/model/useComment"
import { useDialog } from "@/features/dialog/model/useDialog"
import { usePage } from "@/pages/model/usePage"
import { highlightText } from "@/shared/lib/highlightText"
import { Button } from "@/shared/ui"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Key } from "react"

export function CommentListItem({ comment }: { key: Key; comment: Comment }) {
  const { setSelectedComment, modifyComment, removeCommentByPostId } = useComment()
  const { setShowEditCommentDialog } = useDialog()
  const { searchQuery } = usePage()

  // 댓글 좋아요
  async function handleLikeComment(comment: Comment) {
    try {
      const data = await patchComment(comment.postId, { likes: comment.likes + 1 })
      modifyComment(comment.postId, comment.id, data)
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 댓글 수정 대화상자
  function handleShowEditCommentDialog(comment: Comment) {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  // 댓글 삭제
  async function handleDeleteComment(comment: Comment) {
    try {
      await deleteComment(comment.id)
      removeCommentByPostId(comment.postId, comment.id)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>

      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>

        <Button variant="ghost" size="sm" onClick={() => handleShowEditCommentDialog(comment)}>
          <Edit2 className="w-3 h-3" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
