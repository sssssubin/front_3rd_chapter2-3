import { putPost } from "@/entities/post/api"
import { usePost } from "@/features/post/model/usePost.ts"
import { Button, Input, Textarea } from "@/shared/ui"
import { usePostDialog } from "../model/usePostDialog"
import { updatePosts } from "@/entities/post/model"

export function PostEditForm() {
  const { selectedPost, setSelectedPost, setPosts } = usePost()
  const { setShowEditDialog } = usePostDialog()

  function handleTitleChange(title: string) {
    setSelectedPost((selectedPost) => (!selectedPost ? null : { ...selectedPost, title }))
  }

  function handleBodyChange(body: string) {
    setSelectedPost((selectedPost) => (!selectedPost ? null : { ...selectedPost, body }))
  }

  // 게시물 업데이트
  async function handlePostUpdate() {
    if (!selectedPost) return
    try {
      const data = await putPost(selectedPost.id, selectedPost)
      setPosts((posts) => updatePosts(posts, data))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={selectedPost?.title || ""} onChange={(e) => handleTitleChange(e.target.value)} />

      <Textarea
        rows={15}
        placeholder="내용"
        value={selectedPost?.body || ""}
        onChange={(e) => handleBodyChange(e.target.value)}
      />

      <Button onClick={handlePostUpdate}>게시물 업데이트</Button>
    </div>
  )
}
