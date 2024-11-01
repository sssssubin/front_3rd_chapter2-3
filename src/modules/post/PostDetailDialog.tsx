import { usePost } from "../../features/post/model/usePost"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import { usePage } from "../../pages/model/usePage"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { highlightText } from "../../shared/ui/highlightText"
import { CommentList } from "../comment/ui/CommentList"

export default function PostDetailDialog() {
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDialog()
  const { selectedPost } = usePost()
  const { searchQuery } = usePage()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <CommentList postId={selectedPost?.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
