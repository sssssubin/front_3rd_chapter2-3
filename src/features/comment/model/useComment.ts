import {
  addCommentToPost,
  Comment,
  CommentId,
  CommentInput,
  CommentList,
  patchCommentByPostId,
  removeCommentByPostId,
} from "@/entities/comment/model"
import { PostId } from "@/entities/post/model"
import { atom, useAtom } from "jotai"

const commentsAtom = atom<CommentList>({})
const selectedCommentAtom = atom<Comment | null>(null)
const newCommentAtom = atom<CommentInput>({ body: "", postId: null, userId: 1 })

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)

  return new (class {
    comments = comments
    setComments = setComments

    // 댓글 추가
    addCommentToPost(postId: PostId, data: Comment) {
      setComments((comments) => addCommentToPost(comments, postId, data))
    }

    // 댓글 수정
    modifyComment(postId: PostId, commentId: CommentId, comment: Partial<Comment>) {
      setComments((comments) => patchCommentByPostId(comments, postId, commentId, comment))
    }

    // 댓글 삭제
    removeCommentByPostId(postId: PostId, commentId: CommentId) {
      setComments((comments) => removeCommentByPostId(comments, postId, commentId))
    }

    selectedComment = selectedComment
    setSelectedComment = setSelectedComment

    newComment = newComment
    setNewComment = setNewComment
  })()
}
