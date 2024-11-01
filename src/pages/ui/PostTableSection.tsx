import { useQueryPosts } from "@/features/post/api"
import { Loading } from "@/shared/ui"
import { PostTable } from "../../modules/post/ui/PostTable"

export const PostTableSection = () => {
  const { loading, posts } = useQueryPosts()
  return loading ? <Loading /> : <PostTable posts={posts} />
}
