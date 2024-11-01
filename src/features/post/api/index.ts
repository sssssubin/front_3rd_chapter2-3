import { fetchPosts, fetchPostsByTag, fetchPostsSearch } from "@/entities/post/api"
import { fetchUserProfiles } from "@/entities/user/api"
import { usePost } from "@/features/post/model/usePost.ts"
import { useTag } from "@/features/tag/model/useTag"
import { usePage } from "@/pages/model/usePage.ts"
import { useEffect } from "react"

export const useQueryPosts = () => {
  const { searchQuery, skip, limit, sortBy, sortOrder } = usePage()
  const { total, setTotal } = usePost()
  const { posts, setPosts, loading, setLoading } = usePost()
  const { selectedTag } = useTag()

  // 게시물 가져오기
  const queryPosts = async () => {
    setLoading(true)

    try {
      const [postsData, usersData] = await Promise.all([fetchPosts(limit, skip), fetchUserProfiles()])
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
  const queryPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      queryPosts()
      return
    }
    setLoading(true)

    try {
      const [postsData, usersData] = await Promise.all([fetchPostsByTag(tag), fetchUserProfiles()])

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

  // 게시물 검색
  const querySearchPosts = async (searchQuery: string) => {
    setLoading(true)

    try {
      const data = await fetchPostsSearch(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (searchQuery) {
      querySearchPosts(searchQuery)
    } else if (selectedTag) {
      queryPostsByTag(selectedTag)
    } else {
      queryPosts()
    }
  }, [searchQuery, skip, limit, sortBy, sortOrder, selectedTag])

  return new (class {
    posts = posts
    loading = loading
    total = total
  })()
}
