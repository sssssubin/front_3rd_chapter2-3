import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { updateCommentByPostId } from "../../../entities/comment/model"
import { useComment } from "../../../features/comment/model/useComment"
import { useDialog } from "../../../features/dialog/model/useDialog"
import { Button, DialogHeader, Textarea } from "../../../shared/ui"
import { putComment } from "../../../entities/comment/api"

export function CommentEditDialog() {
  const { selectedComment, setSelectedComment } = useComment()
  const { showEditCommentDialog, setShowEditCommentDialog } = useDialog()

  // 댓글 업데이트 핸들러
  async function handleUpdateComment() {
    if (!selectedComment) {
      return
    }

    try {
      const data = await putComment(selectedComment.id, { body: selectedComment.body })
      updateCommentByPostId(data.postId, data)
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  function setCommentBody(body: string): void {
    return setSelectedComment((selectedComment) => ({ ...selectedComment, body }))
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setCommentBody(e.target.value)}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
