import { atom, useAtom } from "jotai"

const tagsAtom = atom([])
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
