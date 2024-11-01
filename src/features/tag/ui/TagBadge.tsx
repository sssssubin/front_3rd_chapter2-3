import { useTag } from "../model/useTag.ts"
import { Key } from "react"

export function TagBadge({ tag }: { key: Key; tag: string }) {
  const { selectedTag, setSelectedTag } = useTag()

  function handleSelectTag() {
    setSelectedTag(tag)
  }

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={handleSelectTag}
    >
      {tag}
    </span>
  )
}
