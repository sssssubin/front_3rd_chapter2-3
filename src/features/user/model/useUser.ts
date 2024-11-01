import { atom, useAtom } from "jotai"

const selectedUserAtom = atom(null)

export const useUser = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return new (class {
    selectedUser = selectedUser
    setSelectedUser = setSelectedUser
  })()
}
