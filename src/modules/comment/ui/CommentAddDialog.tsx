import { CommentAddForm } from "@/features/comment/ui/CommentAddForm"
import { useDialog } from "@/features/dialog/model/useDialog.ts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

export function CommentAddDialog() {
  const { showAddCommentDialog, setShowAddCommentDialog } = useDialog()

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <CommentAddForm />
      </DialogContent>
    </Dialog>
  )
}
