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
  } = usePostStore()

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const postsResponse = await postApi.fetchPosts(limit, skip)
      const users = await userApi.fetchUsers()

      if (!Array.isArray(postsResponse)) {
        console.error("Unexpected response format:", postsResponse)
        return
      }

      const postsWithUsers = postsResponse.map((post: Post) => ({
        ...post,
        author: users.find((user: { id: number }) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsResponse.length)
    } catch (error) {
      console.error("Fetch posts error:", error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postApi.addPost(newPost)
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) return
    try {
      const data = await postApi.updatePost(selectedPost.id, selectedPost)
      const updatedPosts = posts.map((post: Post) => (post.id === data.id ? data : post))
      setPosts(updatedPosts)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await postApi.deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return {
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
  }
}
