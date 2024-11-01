import ky from "ky"
import type { User } from "../model"

interface UsersResponse {
  users: User[]
  total: number
}

export async function fetchUsers(): Promise<UsersResponse> {
  return ky
    .get("/api/users", {
      searchParams: {
        limit: 0,
        select: "username,image",
      },
    })
    .json()
}
