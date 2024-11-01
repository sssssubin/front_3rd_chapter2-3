import { PostActionBar } from "@/pages/ui/PostActionBar.tsx"
import { PostPagination } from "@/pages/ui/PostPagination.tsx"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { usePost } from "../features/post/model/usePost.ts"
import { usePostDialog } from "../features/post/model/usePostDialog.ts"
import { useTag } from "../features/tag/model/useTag.ts"
import { CommentAddDialog } from "../modules/comment/ui/CommentAddDialog.tsx"
import { CommentEditDialog } from "../modules/comment/ui/CommentEditDialog.tsx"
import { PostAddDialog } from "../modules/post/ui/PostAddDialog.tsx"
import PostDetailDialog from "../modules/post/ui/PostDetailDialog.tsx"
import { PostEditDialog } from "../modules/post/ui/PostEditDialog.tsx"
import { PostTable } from "../modules/post/ui/PostTable.tsx"
import { UserDialog } from "../modules/user/ui/UserDialog.tsx"
import { usePage } from "./model/usePage.ts"

const PostsManager = () => {
  // 상태 관리
  const { setPosts, setLoading, loading } = usePost()
  const { setShowAddDialog } = usePostDialog()
  const { tags, setTags, selectedTag } = useTag()

  // pages/model/usePage.ts
  const { searchQuery, skip, limit, sortBy, sortOrder } = usePage()
  const { setTotal } = usePost()

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)

    try {
      const [postsData, usersData] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`).then((res) => res.json()),
        fetch("/api/users?limit=0&select=username,image").then((res) => res.json()),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const searchPosts = async (searchQuery: string) => {
    setLoading(true)

    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      searchPosts(searchQuery)
    } else if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [searchQuery, skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              게시물 추가
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {/* 검색 및 필터 컨트롤 */}
            {<PostActionBar />}

            {/* 게시물 테이블 */}
            {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

            {/* 페이지네이션 */}
            {<PostPagination />}
          </div>
        </CardContent>
      </Card>

      {/* 사용자 모달 */}
      <UserDialog />

      {/* 게시물 상세 보기 대화상자 */}
      {<PostDetailDialog />}

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      {<CommentEditDialog />}
    </>
  )
}

export default PostsManager
