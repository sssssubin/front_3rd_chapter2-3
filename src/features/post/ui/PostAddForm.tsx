import { addPost } from "@/entities/post/api"
import { addPosts, PostInput } from "@/entities/post/model"
import { usePost } from "@/features/post/model/usePost.ts"
import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { Button, Input, Textarea } from "@/shared/ui"
import { useState } from "react"

export function PostAddForm() {
  const { setPosts } = usePost()
  const { setShowAddDialog } = usePostDialog()

  const [newPost, setNewPost] = useState<PostInput>({ title: "", body: "", userId: 1 })

  function handleTitleChange(title: string) {
    setNewPost({ ...newPost, title })
  }

  function handleBodyChange(body: string) {
    setNewPost({ ...newPost, body })
  }

  function handleUserIdChange(userId: string) {
    setNewPost({ ...newPost, userId: Number(userId) })
  }

  async function handlePostAdd() {
    try {
      const data = await addPost(newPost)
      const post = {
        ...data,
        tags: [],
        reactions: { likes: 0, dislikes: 0 },
      }

      setPosts((posts) => addPosts(posts, post))
      setShowAddDialog(false)
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={newPost.title} onChange={(e) => handleTitleChange(e.target.value)} />

      <Textarea rows={30} placeholder="내용" value={newPost.body} onChange={(e) => handleBodyChange(e.target.value)} />

      <Input
        type="number"
        placeholder="사용자 ID"
        value={newPost.userId}
        onChange={(e) => handleUserIdChange(e.target.value)}
      />

      <Button onClick={handlePostAdd}>게시물 추가</Button>
    </div>
  )
}
