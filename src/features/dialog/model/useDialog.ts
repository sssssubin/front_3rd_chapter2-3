import { atom, useAtom } from "jotai"

const dialogsAtom = atom({
  showPostDetailDialog: false,
  showAddDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showUserModal: false,
})

export const useDialog = () => {
  const [dialogs, setDialogs] = useAtom(dialogsAtom)

  return new (class {
    showPostDetailDialog = dialogs.showPostDetailDialog
    showAddDialog = dialogs.showAddDialog
    showAddCommentDialog = dialogs.showAddCommentDialog
    showEditCommentDialog = dialogs.showEditCommentDialog
    showUserModal = dialogs.showUserModal

    setShowPostDetailDialog = (show: boolean) => setDialogs((prev) => ({ ...prev, showPostDetailDialog: show }))
    setShowAddDialog = (show: boolean) => setDialogs((prev) => ({ ...prev, showAddDialog: show }))
    setShowAddCommentDialog = (show: boolean) => setDialogs((prev) => ({ ...prev, showAddCommentDialog: show }))
    setShowEditCommentDialog = (show: boolean) => setDialogs((prev) => ({ ...prev, showEditCommentDialog: show }))
    setShowUserModal = (show: boolean) => setDialogs((prev) => ({ ...prev, showUserModal: show }))
  })()
}
