import { Tag } from "../../../entities/Tag/model/types"
import { TagSelect } from "../../Tag/ui/TagSelect"
import { SortControls } from "../../sorting/ui/SortControls"
import { SearchInput } from "./SearchInput"

interface SearchControlsProps {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  tags: Tag[]
  onSearch: (query: string) => void
  onTagSelect: (tag: string) => void
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

export const SearchControls = ({
  searchQuery,
  selectedTag,
  sortBy,
  sortOrder,
  tags,
  onSearch,
  onTagSelect,
  onSortByChange,
  onSortOrderChange
}: SearchControlsProps) => {
  return (
    <div className="flex gap-4">
      <SearchInput 
        value={searchQuery}
        onChange={onSearch}
      />
      <TagSelect
        value={selectedTag}
        tags={tags}
        onChange={onTagSelect}
      />
      <SortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={onSortByChange}
        onSortOrderChange={onSortOrderChange}
      />
    </div>
  )
}