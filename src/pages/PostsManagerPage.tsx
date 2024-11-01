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
import { PostAddDialog } from "../modules/post/PostAddDialog.tsx"
import PostDetailDialog from "../modules/post/PostDetailDialog.tsx"
import { PostEditDialog } from "../modules/post/PostEditDialog.tsx"
import { PostTable } from "../modules/post/PostTable.tsx"
import { UserDialog } from "../modules/user/ui/UserDialog.tsx"
import { usePage } from "./model/usePage.ts"

const PostsManager = () => {
  // 상태 관리
  const { setPosts } = usePost()
  const { setShowAddDialog } = usePostDialog()
  const { tags, setTags, selectedTag } = useTag()

  const [loading, setLoading] = useState(false)

  // pages/model/usePage.ts
  const { skip, limit, sortBy, sortOrder, setTotal } = usePage()

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

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  function PostPagination(): import("react").ReactNode {
    throw new Error("Function not implemented.")
  }

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

  function PostActionBar() {
    const { searchQuery, setSearchQuery, setSortBy, setSortOrder } = usePage()
    const { selectedTag, setSelectedTag } = useTag()

    const [searchInput, setSearchInput] = useState(searchQuery)

    // 게시물 검색
    const searchPosts = async () => {
      setSearchQuery(searchInput)

      if (!searchInput) {
        fetchPosts()
        return
      }
      setLoading(true)

      try {
        const response = await fetch(`/api/posts/search?q=${searchInput}`)
        const data = await response.json()
        setPosts(data.posts)
        setTotal(data.total)
      } catch (error) {
        console.error("게시물 검색 오류:", error)
      }

      setLoading(false)
    }

    return (
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="게시물 검색..."
              className="pl-8"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchPosts()}
            />
          </div>
        </div>

        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="태그 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 태그</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
                {tag.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">없음</SelectItem>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="title">제목</SelectItem>
            <SelectItem value="reactions">반응</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">오름차순</SelectItem>
            <SelectItem value="desc">내림차순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }
}

export default PostsManager
