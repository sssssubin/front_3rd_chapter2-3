import { useQueryPosts } from "@/features/post/api"
import { usePage } from "@/pages/model/usePage"
import { Loading } from "@/shared/ui"
import { PostTable } from "../../modules/post/ui/PostTable"

export const PostTableSection = () => {
  const { limit, skip, sortBy, sortOrder } = usePage()
  const { loading, posts } = useQueryPosts({ limit, skip, sortBy, sortOrder })

  return loading ? <Loading /> : <PostTable posts={posts} />
}
