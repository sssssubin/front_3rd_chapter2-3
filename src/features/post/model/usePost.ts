import { atom, useAtom } from "jotai"

const postsAtom = atom([])
const selectedPostAtom = atom(null)

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

  return new (class {
    posts = posts
    setPosts = setPosts
    selectedPost = selectedPost
    setSelectedPost = setSelectedPost
  })()
}
