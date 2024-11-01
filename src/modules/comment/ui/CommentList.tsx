// 댓글 렌더링
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import type { Comment, CommentList } from "../../../entities/comment/model"
import { PostId } from "../../../entities/post/model/Post.ts"
import { useComment } from "../../../features/comment/model/useComment.ts"
import { useDialog } from "../../../features/dialog/model/useDialog.ts"
import { usePage } from "../../../pages/model/usePage.ts"
import { Button } from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/highlightText.tsx"

// features/comment/model/useComment.ts
async function patchCommentAddLike(comment: Comment) {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comment.likes + 1 }),
  })
  return await response.json()
}

// ui/CommentList.tsx
export function CommentList({ postId }: { postId: PostId }) {
  const { comments, setNewComment, setSelectedComment, updateCommentByPostId, removeCommentByPostId } = useComment()
  const { searchQuery } = usePage()
  const { setShowAddCommentDialog, setShowEditCommentDialog } = useDialog()

  // 댓글 추가 대화상자
  function handleShowAddCommentDialog() {
    setNewComment((prev) => ({ ...prev, postId }))
    setShowAddCommentDialog(true)
  }

  // 댓글 좋아요
  async function handleLikeComment(comment: Comment) {
    try {
      const data = await patchCommentAddLike(comment)
      updateCommentByPostId(postId, data)
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
  async function deleteComment(comment: Comment) {
    try {
      await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      })
      removeCommentByPostId(postId, comment.id)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleShowAddCommentDialog}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>

      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
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

              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
