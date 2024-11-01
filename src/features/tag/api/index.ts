import { fetchTags } from "@/entities/tag/api"
import { useEffect } from "react"
import { useTag } from "../model/useTag"

export const useQueryTags = () => {
  const { tags, setTags } = useTag()

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
