import { User } from "@/entities/user/model/User"
import { atom, useAtom } from "jotai"

const selectedUserAtom = atom<User | null>(null)

export const useUser = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return new (class {
    selectedUser = selectedUser
    setSelectedUser = setSelectedUser
  })()
}
