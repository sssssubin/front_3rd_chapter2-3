import { atom, useAtom } from "jotai"

const showAddCommentDialogAtom = atom(false)
const showEditCommentDialogAtom = atom(false)
const showUserModalAtom = atom(false)

export const useDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)

  return new (class {
    showAddCommentDialog = showAddCommentDialog
    showEditCommentDialog = showEditCommentDialog
    showUserModal = showUserModal

    setShowAddCommentDialog = setShowAddCommentDialog
    setShowEditCommentDialog = setShowEditCommentDialog
    setShowUserModal = setShowUserModal
  })()
}
