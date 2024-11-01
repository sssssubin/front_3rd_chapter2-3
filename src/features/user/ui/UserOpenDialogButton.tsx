// features/user/ui
import type { User } from "@/entities/user/model/User.ts"
import { useDialog } from "@/features/dialog/model/useDialog.ts"
import { useUser } from "@/features/user/model/useUser.ts"

export function UserOpenDialogButton({ user }: { user: User }) {
  const { setSelectedUser } = useUser()
  const { setShowUserModal } = useDialog()

  // 사용자 모달 열기
  async function handleOpenUserModal(user: User) {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleOpenUserModal(user)}>
      <img src={user?.image} alt={user?.username} className="w-8 h-8 rounded-full" />
      <span>{user?.username}</span>
    </div>
  )
}
