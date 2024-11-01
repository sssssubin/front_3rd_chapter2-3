// widgets/post/ui
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Key } from "react"
import { Post } from "@/entities/post/model"
import { User } from "@/entities/user/model/User.ts"
import { useComment } from "@/features/comment/model/useComment.ts"
import { useDialog } from "@/features/dialog/model/useDialog.ts"
import { usePost } from "@/features/post/model/usePost.ts"
import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { TagBadge } from "../../features/tag/ui/TagBadge.tsx"
import { useUser } from "@/features/user/model/useUser.ts"
import { usePage } from "@/pages/model/usePage.ts"
import { Button, TableCell, TableRow } from "@/shared/ui"
import { highlightText } from "@/shared/ui/highlightText.tsx"

// features/post/ui
function PostOpenDetailButton({ post }: { post: Post }) {
  const { setSelectedPost } = usePost()
  const { fetchComments } = useComment()
  const { setShowPostDetailDialog } = usePostDialog()

  // 게시물 상세 보기
  function handleOpenPostDetail(post: Post) {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleOpenPostDetail(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}

// features/post/ui
function PostShowEditDialogButton({ post }: { post: Post }) {
  const { setSelectedPost } = usePost()
  const { setShowEditDialog } = usePostDialog()

  function handleShowEditDialog() {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleShowEditDialog}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}

// features/post/ui
function PostDeleteButton({ post }: { post: Post }) {
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

// features/post/ui
function UserOpenDialogButton({ user }: { user: User }) {
  const { setSelectedUser } = useUser()
  const { setShowUserModal } = useDialog()

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(user)}>
      <img src={user?.image} alt={user?.username} className="w-8 h-8 rounded-full" />
      <span>{user?.username}</span>
    </div>
  )
}

export function PostTableItem({ post }: { key: Key; post: Post }) {
  const { searchQuery } = usePage()

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>

      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <UserOpenDialogButton user={post.author} />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <PostOpenDetailButton post={post} />
          <PostShowEditDialogButton post={post} />
          <PostDeleteButton post={post} />
        </div>
      </TableCell>
    </TableRow>
  )
}
