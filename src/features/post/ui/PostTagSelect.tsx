import { useQueryTags } from "@/features/tag/api"
import { useTag } from "@/features/tag/model/useTag"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"

export function PostTagSelect() {
  const { selectedTag, setSelectedTag } = useTag()
  const { tags } = useQueryTags()

  return (
    <Select value={selectedTag} onValueChange={setSelectedTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
