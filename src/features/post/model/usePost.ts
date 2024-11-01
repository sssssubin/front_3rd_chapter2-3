import { atom, useAtom } from "jotai"

const postsAtom = atom([])
const selectedPostAtom = atom(null)
const loadingAtom = atom(false)
const totalAtom = atom(0)

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

  const [loading, setLoading] = useAtom(loadingAtom)
  const [total, setTotal] = useAtom(totalAtom)

  return new (class {
    posts = posts
    setPosts = setPosts
    selectedPost = selectedPost
    setSelectedPost = setSelectedPost

    loading = loading
    setLoading = setLoading

    total = total
    setTotal = setTotal
  })()
}
