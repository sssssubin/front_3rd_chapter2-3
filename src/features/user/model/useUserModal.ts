import { fetchUser } from "@/entities/user/api"
import type { User } from "@/entities/user/model/User.ts"
import { atom, useAtom } from "jotai"

const selectedUserAtom = atom<User | null>(null)
const showUserModalAtom = atom(false)

export function useUserModal() {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)

  async function openUserModal(user: User) {
    try {
      const userData = await fetchUser(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return new (class {
    // TODO: 이 셋을 return 하기 보다는 Dialog 컴포넌트를 제공하는 것이 좋을 듯
    selectedUser = selectedUser
    showUserModal = showUserModal
    setShowUserModal = setShowUserModal

    openUserModal = openUserModal
  })()
}
