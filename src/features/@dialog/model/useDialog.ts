import { atom, useAtom } from "jotai"

const showAddCommentDialogAtom = atom(false)
const showEditCommentDialogAtom = atom(false)

export const useDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return new (class {
    showAddCommentDialog = showAddCommentDialog
    showEditCommentDialog = showEditCommentDialog

    setShowAddCommentDialog = setShowAddCommentDialog
    setShowEditCommentDialog = setShowEditCommentDialog
  })()
}
