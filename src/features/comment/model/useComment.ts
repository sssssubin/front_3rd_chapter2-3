import { atom, useAtom } from "jotai"
import { Comment, CommentInput, removeCommentByPostId, updateCommentByPostId } from "@/entities/comment/model"
import { PostId } from "@/entities/post/model"

const commentsAtom = atom<Record<PostId, Comment[]>>({})
const selectedCommentAtom = atom<Comment | null>(null)
const newCommentAtom = atom<CommentInput>({ body: "", postId: null, userId: 1 })

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)

  // 댓글 가져오기
  const fetchComments = async (postId: PostId) => {
    // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    if (comments[postId]) {
      return
    }

    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  return new (class {
    comments = comments
    setComments = setComments

    selectedComment = selectedComment
    setSelectedComment = setSelectedComment

    newComment = newComment
    setNewComment = setNewComment

    fetchComments = fetchComments

    updateCommentByPostId(postId: PostId, comment: Comment) {
      setComments(updateCommentByPostId(postId, comment))
    }

    removeCommentByPostId(postId: PostId, commentId: number) {
      setComments(removeCommentByPostId(postId, commentId))
    }
  })()
}
