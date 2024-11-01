import ky from "ky"

export async function fetchTags(): Promise<string[]> {
  return ky.get("/api/posts/tags").json()
}
