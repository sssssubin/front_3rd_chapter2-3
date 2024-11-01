// features/post/ui
import type { Post, PostId } from "@/entities/post/model"
import { usePost } from "@/features/post/model/usePost.ts"
import { Button } from "@/shared/ui"
import { Trash2 } from "lucide-react"

export function PostDeleteButton({ post }: { post: Post }) {
  const { posts, setPosts } = usePost()

  // 게시물 삭제
  async function handleDeletePost(id: PostId) {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
