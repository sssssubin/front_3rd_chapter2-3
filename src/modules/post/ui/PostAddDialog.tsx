import { useState } from "react"
import { Post } from "@/entities/post/model"
import { usePost } from "@/features/post/model/usePost.ts"
import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"

export function PostAddDialog() {
  const { showAddDialog, setShowAddDialog } = usePostDialog()
  const { posts, setPosts } = usePost()
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  // 게시물 추가
  async function handleAddPost(newPost: Post) {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()

      const post = {
        ...data,
        tags: [],
        reactions: { likes: 0, dislikes: 0 },
      }

      setPosts([post, ...posts])
      setShowAddDialog(false)
      setNewPost({
        title: "",
        body: "",
        userId: 121,
        tags: [],
        reactions: { likes: 0, dislikes: 0 },
        comments: [],
      })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />

          <Button onClick={() => handleAddPost(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
