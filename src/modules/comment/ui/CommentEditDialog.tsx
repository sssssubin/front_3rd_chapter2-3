import { patchComment } from "@/entities/comment/api"
import { useComment } from "@/features/comment/model/useComment.ts"
import { useDialog } from "@/features/dialog/model/useDialog.ts"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"

export function CommentEditDialog() {
  const { selectedComment, setSelectedComment, modifyComment } = useComment()
  const { showEditCommentDialog, setShowEditCommentDialog } = useDialog()

  function handleBodyChange(body: string): void {
    setSelectedComment((selectedComment) => (!selectedComment ? null : { ...selectedComment, body }))
  }

  // 댓글 업데이트 핸들러
  async function handleCommentUpdate() {
    if (!selectedComment) {
      return
    }

    try {
      const data = await patchComment(selectedComment.postId, { body: selectedComment.body })
      modifyComment(selectedComment.postId, selectedComment.id, data)
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
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
            onChange={(e) => handleBodyChange(e.target.value)}
          />
          <Button onClick={handleCommentUpdate}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
