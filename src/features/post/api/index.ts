import { fetchPosts, fetchPostsByTag, searchPosts } from "@/entities/post/api"
import { fetchTags } from "@/entities/tag/api"
import { fetchUsers } from "@/entities/user/api"
import { usePost } from "@/features/post/model/usePost.ts"
import { usePage } from "@/pages/model/usePage.ts"
import { useEffect, useState } from "react"

interface UsePostsQueryResult {
  posts: PostWithAuthor[]
  isLoading: boolean
  total: number
}

export const useQueryPosts = ({ limit, skip, tag, searchQuery }: UsePostsQueryParams) => {
  // pages/model/usePage.ts
  const { searchQuery, skip, limit, sortBy, sortOrder } = usePage()
  const { setTotal } = usePost()
  const { posts, setPosts, loading, setLoading } = usePost()

  // 게시물 가져오기
  const queryPosts = async () => {
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([fetchPosts(limit, skip), fetchUsers()])
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
      const [postsData, usersData] = await Promise.all([fetchPostsByTag(tag), fetchUsers()])

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
      const data = await searchPosts(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }

    setLoading(false)
  }

  useEffect(() => {
    queryTags()
  }, [])

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

export const useQueryTags = () => {
  const [tags, setTags] = useState([])

  // 태그 가져오기
  const queryTags = async () => {
    try {
      const data = await fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    queryTags()
  }, [])

  return { tags }
}
