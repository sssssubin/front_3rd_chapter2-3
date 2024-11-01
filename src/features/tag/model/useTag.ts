import { Tag } from "@/entities/tag/model/Tag"
import { atom, useAtom } from "jotai"

const tagsAtom = atom<Tag[]>([])
const selectedTagAtom = atom("")

export const useTag = () => {
  const [tags, setTags] = useAtom(tagsAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  return new (class {
    tags = tags
    setTags = setTags
    selectedTag = selectedTag
    setSelectedTag = setSelectedTag
  })()
}
