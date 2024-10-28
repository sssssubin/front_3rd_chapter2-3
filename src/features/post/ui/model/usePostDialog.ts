import { atom } from "jotai"
import { useAtom } from "jotai/index"

const showPostDetailDialogAtom = atom(false)
const showEditDialogAtom = atom(false)

export const usePostDialog = () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)

  return new (class {
    showEditDialog = showEditDialog
    setShowEditDialog = setShowEditDialog

    showPostDetailDialog = showPostDetailDialog
    setShowPostDetailDialog = setShowPostDetailDialog
  })()
}
