import { Post } from "../../../../entities/Post/model/types"
import { postApi } from "../../../../entities/Post/api/postApi"
import { userApi } from "../../../../entities/User/api/userApi"
import { usePostStore } from "../stores/usePostStore"

export const usePostService = () => {
  const {
    posts,
    setPosts,
    total,
    setTotal,
    skip,
    limit,
    setLoading,
    newPost,
    setShowAddDialog,
    setNewPost,
    selectedPost,
    setShowEditDialog,
    searchQuery,
    setSearchQuery,
  } = usePostStore()

  // 게시물 조회
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const postsResponse = await postApi.getPosts(limit, skip)
      const users = await userApi.getUsers()

      if (!Array.isArray(postsResponse)) {
        console.error("예상치 못한 응답 형식:", postsResponse)
        return
      }

      const postsWithUsers = postsResponse.map((post: Post) => ({
        ...post,
        author: users.find((user: { id: number }) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsResponse.length)
    } catch (error) {
      console.error("게시물 조회 오류:", error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postApi.createPost(newPost)
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 수정
  const editPost = async () => {
    if (!selectedPost) return
    try {
      const data = await postApi.updatePost(selectedPost.id, selectedPost)
      const updatedPosts = posts.map((post: Post) => (post.id === data.id ? data : post))
      setPosts(updatedPosts)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 수정 오류:", error)
    }
  }

  // 게시물 삭제
  const removePost = async (id: number) => {
    try {
      await postApi.deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await postApi.searchPost(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  return {
    fetchPosts,
    addPost,
    editPost,
    removePost,
    searchPosts,
  }
}
