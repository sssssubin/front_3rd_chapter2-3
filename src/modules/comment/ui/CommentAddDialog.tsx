import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useComment } from "../../../features/comment/model/useComment"
import { DialogHeader, Textarea, Button } from "../../../shared/ui"
import { useDialog } from "../../../features/dialog/model/useDialog"

export function CommentAddDialog() {
  const { setComments } = useComment()
  const { newComment, setNewComment } = useComment()
  const { showAddCommentDialog, setShowAddCommentDialog } = useDialog()

  // 댓글 추가
  async function handleAddComment() {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()

      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))

      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />

          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
