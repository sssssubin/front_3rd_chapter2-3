import { User } from "../model/types"

export const userApi = {
  // 사용자 정보 조회
  fetchUsers: async (): Promise<User[]> => {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return data.users
  },
}