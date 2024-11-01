import { addComment } from "@/entities/comment/api"
import { useComment } from "@/features/comment/model/useComment.ts"
import { useDialog } from "@/features/dialog/model/useDialog.ts"
import { Button, Textarea } from "@/shared/ui"

export function CommentAddForm() {
  const { addCommentToPost } = useComment()
  const { newComment, setNewComment } = useComment()
  const { setShowAddCommentDialog } = useDialog()

  function handleBodyChange(body: string) {
    setNewComment({ ...newComment, body })
  }

  async function handleCommentAdd() {
    try {
      const data = await addComment(newComment)
      addCommentToPost(data.postId, data)
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={newComment.body} onChange={(e) => handleBodyChange(e.target.value)} />

      <Button onClick={handleCommentAdd}>댓글 추가</Button>
    </div>
  )
}
