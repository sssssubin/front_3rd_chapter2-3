import { putPost } from "@/entities/post/api"
import { usePost } from "@/features/post/model/usePost.ts"
import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"

export function PostEditDialog() {
  const { showEditDialog, setShowEditDialog } = usePostDialog()
  const { selectedPost, setPosts, setSelectedPost } = usePost()

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) return
    try {
      const data = await putPost(selectedPost.id, selectedPost)
      setPosts((posts) => posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }
  function handleTitleChange(title: string) {
    setSelectedPost((selectedPost) => (!selectedPost ? null : { ...selectedPost, title }))
  }

  function handleBodyChange(body: string) {
    setSelectedPost((selectedPost) => (!selectedPost ? null : { ...selectedPost, body }))
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => handleBodyChange(e.target.value)}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
