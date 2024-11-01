import ky from "ky"
import type { Post, PostInput } from "../model"

interface PostsResponse {
  posts: Post[]
  total: number
}

export async function fetchPosts(limit: number, skip: number): Promise<PostsResponse> {
  return ky.get(`/api/posts`, { searchParams: { limit, skip } }).json()
}

export async function fetchPostsByTag(tag: string): Promise<PostsResponse> {
  return ky.get(`/api/posts/tag/${tag}`).json()
}

export async function fetchPostsSearch(query: string): Promise<PostsResponse> {
  return ky.get(`/api/posts/search`, { searchParams: { q: query } }).json()
}

export async function addPost(post: PostInput): Promise<Post> {
  return ky.post("/api/posts/add", { json: post }).json()
}

export async function putPost(id: number, post: PostInput): Promise<Post> {
  return ky.put(`/api/posts/${id}`, { json: post }).json()
}

export function deletePost(id: number): Promise<void> {
  return ky.delete(`/api/posts/${id}`).json()
}
