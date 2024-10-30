import { tagApi } from "../../../../entities/Tag/api/tagApi"
import { useTagStore } from "../stores/useTagStore"

export const useTagService = () => {
  const { setTags } = useTagStore()

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await tagApi.fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  return {
    fetchTags,
  }
}
